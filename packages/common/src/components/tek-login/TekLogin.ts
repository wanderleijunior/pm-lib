import {
    Button,
    Checkbox,
    DialogService,
    Form,
    IComponentRender,
    LoadingService,
    Login,
    Modal,
    ModalService,
    Select,
    Text,
} from '@zeedhi/common';
import { Config, Http, I18n, IDictionary, IEventParam, KeyMap, Metadata, } from '@zeedhi/core';
import { ITekLogin } from './Interfaces';
import { getAuthForms } from './AuthForms';
import { Api } from './Api';

export class TekLogin extends Login implements ITekLogin {
    public cardWidth: string | number = 450;

    public layout: string = 'right';

    public endPoint: string;

    public isProduct: boolean = true;

    public children: IComponentRender[] = getAuthForms(this);

    /* istanbul ignore next */
    constructor(props: ITekLogin) {
        super(props);
        this.cardWidth = this.getInitValue('cardWidth', props.cardWidth, this.cardWidth);
        this.layout = this.getInitValue('layout', props.layout, this.layout);
        this.endPoint = this.getInitValue('endPoint', props.endPoint, '');
        this.isProduct = this.getInitValue('isProduct', props.isProduct, this.isProduct);
        this.children = Array.isArray(props.children) ? props.children : this.children;
        this.createAccessors();
    }

    private testLicenseKeyMap = {
        'ctrl+shift+alt+,': {
            event: this.testLicenseConnection.bind(this),
            input: true,
        },
    };

    private attempts: IDictionary = {};

    private confirmSessionChange: boolean = false;

    private user: string = '';

    private password: string = '';

    private hash: string | null = '';

    private userData: any;

    private privacyModal?: Modal;

    public onMounted(element: HTMLElement) {
        super.onMounted(element);

        Api._initialize(this.endPoint);

        if (process.env.NODE_ENV === 'production' && localStorage.getItem('LOGIN_USER')) {
            this.redirectToProduct();
        } else {
            this.attempts = {};

            const keepConnectedCheckbox = Metadata.getInstance<Checkbox>('keep-connected');
            keepConnectedCheckbox.value = localStorage.getItem('LOGIN_KEEP_CONNECTED');

            this.updateLanguages();
            KeyMap.bind(this.testLicenseKeyMap);
        }
    }

    public onBeforeDestroy() {
        super.onBeforeDestroy();
        KeyMap.unbind(this.testLicenseKeyMap);
    }

    public privacyClick({ component }: IEventParam<Text>) {
        const form = component.parent as Form;
        const userFieldValue = form.value.user;
        const user = !userFieldValue ? null : userFieldValue;
        LoadingService.show();
        this.findPrivacyPolicyByAuthentication(user)
            .then((response) => {
                LoadingService.hide();
                if (!response.status) {
                    this.showForm('formEmailPrivacyPolicy');
                } else {
                    localStorage.setItem('privacyPolicyPath', response.path);
                    this.openModalPrivacyPolicy();
                }
            })
            .catch(this.defaultError);
    }

    private async findPrivacyPolicyByAuthentication(user: string) {
        try {
            const response = await Api.findPrivacyPolicyByAuthentication(user);
            return response.data;
        } catch (error: any) {
            LoadingService.hide();
            this.defaultError(error.response);
            return Promise.reject();
        }
    }

    private openModalPrivacyPolicy() {
        if (!this.privacyModal) {
            this.privacyModal = ModalService.create({
                name: 'modalPrivacyPolicy',
                fullscreen: true,
                children: [
                    {
                        name: 'fullscreenHeader',
                        component: 'ZdHeader',
                        color: 'transparent',
                        padless: true,
                        elevation: 0,
                        leftSlot: [
                            {
                                name: 'titleText',
                                component: 'ZdText',
                                text: 'LOGIN_PRIVACY',
                                cssClass: 'zd-theme-font-title',
                            },
                        ],
                        rightSlot: [
                            {
                                name: 'closeModalButton',
                                component: 'ZdButton',
                                icon: true,
                                color: 'black',
                                iconName: 'mdi-close',
                                small: true,
                                modalName: 'modalPrivacyPolicy',
                                events: {
                                    click: () => {
                                        this.privacyModal?.hide();
                                        this.showForm('formLogin');
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: 'privacyPdf',
                        component: 'ZdText',
                        compile: true,
                        cssStyle: 'position: absolute; top: 50px; left: 16px; right: 16px; bottom: 16px;',
                        text: '',
                        events: {
                            onMounted: (({ element }: IEventParam<Text>) => {
                                const pdfUrl = localStorage.getItem('privacyPolicyPath');
                                // const googleUrl = 'https://drive.google.com/viewerng/viewer?embedded=true';
                                // const pdfIframeSrc = `${googleUrl}&url=${pdfUrl}#toolbar=0&scrollbar=0`;
                                const frameParams = `src="${pdfUrl}" frameBorder="0" scrolling="auto" height="100%" width="100%"`;
                                const frame = `<iframe ${frameParams}></iframe>`;

                                if (element) {
                                    element.innerHTML = frame;
                                }
                            }),
                        },
                    },
                ],
            });
        }

        this.privacyModal.show();
    }

    public loginEmailPrivacyPolicyCancel() {
        this.showForm('formLogin');
    }

    public loginKeyEnterEmailPrivacyPolicyConfirm(param: any) {
        if (param.event.key === 'Enter') {
            this.loginEmailPrivacyPolicyConfirm(param);
        }
    }

    public loginEmailPrivacyPolicyConfirm({ component }: IEventParam<Button>) {
        const form = (component.parent as Form);
        if (form.validate()) {
            this.findPrivacyPolicyByAuthentication(form.value.email)
                .then((response: any) => {
                    localStorage.setItem('privacyPolicyPath', response.path);
                    this.openModalPrivacyPolicy();
                })
                .catch(this.defaultError);
        }
    }

    public forgetClick() {
        const formLogin = Metadata.getInstance<Form>('formLogin');
        const formForgetPassword = Metadata.getInstance<Form>('formForgetPassword');
        this.showForm('formForgetPassword');
        formForgetPassword.value.email = formLogin.value.user;
    }

    public loginKeyEnterForgetPasswordConfirm(param: any) {
        if (param.event.key === 'Enter') {
            this.loginForgetPasswordConfirm(param);
        }
    }

    public loginForgetPasswordConfirm({ component }: IEventParam<Button>) {
        const form = (component.parent as Form);
        if (form.validate()) {
            const { email } = form.value;
            const cssStyle = ''; // REVER
            this.requestNewPassword(email, cssStyle);
        }
    }

    public loginForgetPasswordCancel() {
        this.showForm('formLogin');
    }

    private setCurrentLanguage(language: string) {
        const languageSelect = Metadata.getInstance<Select>('language-select');
        localStorage.setItem('LOGIN_LANGUAGE', language);
        I18n.changeLanguage(this.getLanguageNewFormat(language));
        languageSelect.setValue(language);
    }

    private getLanguageNewFormat(language: string) {
        const languageParts = language.split('_');
        return `${languageParts[0]}-${languageParts[1].toUpperCase()}`;
    }

    private getLanguageOldFormat(language: string) {
        const languageParts = language.split('-');
        return `${languageParts[0]}_${languageParts[1].toLowerCase()}`;
    }

    private updateLanguages() {
        const languageSelect = Metadata.getInstance<Select>('language-select');
        let language = this.getLanguageOldFormat(I18n.instance.language);
        this.getProductLanguages()
            .then((response) => {
                const productLanguages = response.data.LANGUAGES;
                const defaultLanguage = response.data.DEFAULT_LANGUAGE;
                if (defaultLanguage && defaultLanguage.SHORT_NAME) {
                    const defaultLangValidation = productLanguages.filter((lang: any) => lang.SHORT_NAME === defaultLanguage.SHORT_NAME);
                    if (defaultLangValidation && defaultLangValidation.length > 0) {
                        productLanguages.push(defaultLanguage);
                    }
                    language = localStorage.getItem('LOGIN_LANGUAGE') || defaultLanguage.SHORT_NAME;
                } else {
                    language = localStorage.getItem('LOGIN_LANGUAGE') || language;
                }
                if (productLanguages && productLanguages.length > 0) {
                    languageSelect.datasource.data = productLanguages;
                    languageSelect.disabled = productLanguages.length === 1;
                } else {
                    languageSelect.disabled = true;
                }
                this.setCurrentLanguage(language);
            })
            .catch(() => {
                languageSelect.disabled = true;
                this.setCurrentLanguage(language);
            });
    }

	private getUrl(route: string) {
		return this.endPoint + route;
	}

    private getDataSource(route: string, filter: IDictionary[], page: number) {
        return Http.post(this.getUrl(route), {
            filter,
            page,
            requestType: 'FilterData',
            timeout: 120000,
            origin: {
                containerLabel: 'Login',
                containerName: 'LOGIN',
                widgetLabel: 'TekLogin',
                widgetName: 'TEKLOGIN',
            },
        });
    }

    private setDataSource(url: string, dataset: IDictionary[]) {
        dataset.forEach((data) => {
            data.changed = true;
        });

        return Http.post(this.getUrl(`/${url}/save`), {
            dataset,
            requestType: 'DataSet',
            serviceName: `${Config.env.endPoint}/${url}/save`,
            timeout: 120000,
            origin: {
                containerLabel: 'Login',
                containerName: 'LOGIN',
                widgetLabel: 'TekLogin',
                widgetName: 'TEKLOGIN',
            },
        });
    }

    private async getProductLanguages() {
        const productId = localStorage.getItem('PRODUCT_ID');
        return Api.productLanguages(productId);
    }

    public changeLanguage({ component }: IEventParam<Select>) {
        const actualLanguage = localStorage.getItem('LOGIN_LANGUAGE');
        const language = component.value;
        if (actualLanguage !== language) {
            localStorage.setItem('LOGIN_LANGUAGE', language);
            I18n.changeLanguage(this.getLanguageNewFormat(language));
            // REVER
            // var updatedTitle = ScreenService.i18n(templateManager.container.label);
            // if (document.title.includes(' - ')) {
            //   var productSufixTitle = document.title.split(' - ').pop();
            //   updatedTitle = updatedTitle + ' - ' + productSufixTitle;
            // }
            // templateManager.updateTitle(updatedTitle);
        }
    }

    public changeKeepConnected({ component }: IEventParam<Checkbox>) {
        localStorage.setItem('LOGIN_KEEP_CONNECTED', component.value);
    }

    private generateKey() {
        return Math.random()
            .toString(36)
            .substring(2, 15);
    }

    public loginKeyEnter(param: any) {
        if (param.event.key === 'Enter') {
            this.loginClick(param);
        }
    }

    public loginClick({ component }: IEventParam<Button>) {
        const form = (component.parent as Form);
        if (form.validate()) {
            this.user = form.value.user;
            this.password = form.value.password;

            this.hash = localStorage.getItem('LOGIN_HASH');
            this.confirmSessionChange = false;

            if (!this.hash) {
                const newHash = this.generateKey();
                localStorage.setItem('LOGIN_HASH', newHash);
                this.hash = localStorage.getItem('LOGIN_HASH');
            }

            if (!this.attempts[this.user]) {
                this.attempts[this.user] = 1;
            }
            this.doLogin(this.user, this.password, this.attempts[this.user], this.hash!, this.confirmSessionChange);
        }
    }

    public loginKeyEnterExpiredPasswordConfirm(param: any) {
        if (param.event.key === 'Enter') {
            this.loginExpiredPasswordConfirm(param);
        }
    }

    public loginExpiredPasswordConfirm({ component }: IEventParam<Button>) {
        const form = (component.parent as Form);
        if (form.validate()) {
            this.dologinExpiredPasswordConfirm(form.value);
        }
    }

    public loginExpiredPasswordCancel() {
        this.showForm('formLogin');
    }

    private showForm(formName: string) {
        const formLogin = Metadata.getInstance<Form>('formLogin');
        const formExpiredPassword = Metadata.getInstance<Form>('formExpiredPassword');
        const formForgetPassword = Metadata.getInstance<Form>('formForgetPassword');
        const formEmailPrivacyPolicy = Metadata.getInstance<Form>('formEmailPrivacyPolicy');
        formLogin.isVisible = formName === 'formLogin';
        formExpiredPassword.isVisible = formName === 'formExpiredPassword';
        formForgetPassword.isVisible = formName === 'formForgetPassword';
        formEmailPrivacyPolicy.isVisible = formName === 'formEmailPrivacyPolicy';
    }

    private isJson(str: string) {
        let result = null;

        try {
            result = JSON.parse(str);
        } catch (e) {
            // nothing to do
        }

        return result;
    }

    private showInvalidPasswordMaskMessage(messageCode: string, params: any) {
        let messages = '';
        params.forEach((param: any) => {
            if (param && param.EXISTS_MASK && param.INVALID_MASK) {
                messages += `<li align="left">${I18n.translate(param.MESSAGE, param.PARAMS)}</li>`;
            }
        });
        this.showMessage(messageCode, {
            validations: messages,
            interpolation: { escapeValue: false }
        });
    }

    private setLogAccess(userId: string, isSupportOperator: boolean) {
        if (isSupportOperator) {
            return Promise.resolve();
        }
        const row = {
            USER_ID: userId,
        };
        return this.setDataSource('setLogAccess', [row]);
    }

    private testLicenseConnection() {
        this.getDataSource('/testLicenseConnection', [], 1)
            .then((response) => {
                const result = response.data.dataset.testLicenseConnection;
                const params: any = {
                    URL: result.URL,
                };
                if (result.ERROR) {
                    params.ERROR = result.ERROR;
                    this.showMessage('ERR_LICENSE_CONNECTION', params, 'error');
                } else {
                    this.showMessage('SUC_LICENSE_CONNECTION', params, 'success');
                }
            })
            .catch(this.defaultError);
    }

    [key: string]: any;

    /** Services */

    private async doLogin(user: string, password: string, attempts: number, hash: string, confirmSessionChange: boolean) {
        const productId = localStorage.getItem('PRODUCT_ID');
        const showFullOperator = false;
        const keepConnected = localStorage.getItem('LOGIN_KEEP_CONNECTED') === 'Yes' ? 'S' : 'N';
        const requesterUrl = document.location.href;
        try {
            LoadingService.show();
            const response = await Api.login(user, password, productId, attempts, showFullOperator, hash,
                confirmSessionChange, keepConnected, requesterUrl);
			LoadingService.hide();
			this.checkLoginResponse(response);
        } catch (error: any) {
            LoadingService.hide();
            this.checkLoginErrorResponse(error.response);
        }
    }

    private checkLoginResponse(response: any) {
        const { data } = response;
        if (data && data.LOGGED) {
            const userData = data;
            if (userData.EXPIRED_PASSWORD) {
                this.expiredPasswordValidation(userData);
            } else if (userData.ALERT_EXPIRATION_DATE_PER || userData.ALERT_EXPIRATION_DATE_PER === 0) {
                const msg = userData.ALERT_EXPIRATION_DATE_PER === 0
                    ? 'ALERT_EXPIRATION_DATE_PER_TODAY' : 'ALERT_EXPIRATION_DATE_PER';
                this.showMessage(msg, { days: userData.ALERT_EXPIRATION_DATE_PER }, 'warning', [
                    {
                        name: 'ok',
                        component: 'ZdButton',
                        label: 'OK',
                        events: {
                            click: (() => {
                                DialogService.hide();
                                this.redirectAfterLogin(userData);
                            }),
                        },
                    },
                ]);
            } else {
                this.redirectAfterLogin(userData);
            }
        } else {
            this.checkLoginErrorResponse(response);
        }
    }

    private checkLoginErrorResponse(error: any) {
        if (error && error.data && error.data.code) {
            /** Error code 29: If miss the password again, the user will be blocked */
            /** Error code 31: Access blocked by attempts */
            /** Error code 32: Invalid user and password */
            const { code } = error.data;
            if (code === 29 || code === 32) {
                this.attempts[this.user] += 1;
                this.defaultError(error);
            } else if (code === 31) {
                this.attempts[this.user] = 1;
                this.defaultError(error);
            } else if (code === 35) {
                this.showMessage('ALE_CONCURRENT_ACCESS', {}, 'warning', [
                    {
                        name: 'no',
                        component: 'ZdButton',
                        label: 'NO',
                        events: {
                            click: (() => {
                                DialogService.hide();
                            }),
                        },
                        outline: true,
                    },
                    {
                        name: 'yes',
                        component: 'ZdButton',
                        label: 'YES',
                        events: {
                            click: () => {
                                DialogService.hide();
                                this.confirmSessionChange = true;
                                this.doLogin(this.user, this.password, this.attempts[this.user], this.hash!, this.confirmSessionChange);
                            },
                        },
                    },
                ]);
            } else if (code === 36) {
                this.showMessage('EXPIRATION_DATE_PER', {}, 'error');
            } else {
                this.defaultError(error);
            }
        } else {
            this.defaultError(error);
        }
    }

    private defaultError(response: any) {
        const defaultMessage = 'ERR_UNEXPECTED_ERROR';
        if (response && response.data && response.data.error) {
            let { data } = response;
            const { error } = data;

            if (this.isJson(data)) {
                data = JSON.parse(data);
            }

            const params = data.messageParams || null;
            const messageCode = data.messageCode || error || 'ERR_UNEXPECTED_ERROR';
            const message = messageCode.split('Exception: ')
                .pop();

            if (message === 'INVALID_PASSWORD_MASK') {
                this.showInvalidPasswordMaskMessage(message, params);
            } else {
                this.showMessage(message, params, 'error');
            }
        } else {
            this.showMessage(defaultMessage, {}, 'error');
        }
    }

    private async dologinExpiredPasswordConfirm(formValue: any) {
        const {
            expiredUser,
            actualPassword,
            newPassword,
            confirmPassword,
        } = formValue;

        try {
            LoadingService.show();
            await Api.updatePassword(actualPassword, newPassword, confirmPassword, expiredUser);
            LoadingService.hide();
            this.showMessage('SUC_PASSWORD_UPDATED', {}, 'success');
            setTimeout(() => {
                LoadingService.hide();
                this.redirectAfterLogin(this.userData);
            }, 3000);
        } catch (error: any) {
            LoadingService.hide();
            this.defaultError(error.response);
        }
    }

    private async requestNewPassword(email: string, style: string) {
        try {
            LoadingService.show();
            await Api.requestNewPassword(email, style);
            LoadingService.hide();
            this.showMessage('SUC_RESET_PASSWORD', { email }, 'success');
            this.showForm('formLogin');
        } catch (error: any) {
            LoadingService.hide();
            this.defaultError(error.response);
        }
    }

    private expiredPasswordValidation(userData: any) {
        const TYPE_EXPIRED_PASSWORD = 'EXPIRED_PASSWORD';
        const TYPE_PASSWORD_WILL_EXPIRE = 'PASSWORD_WILL_EXPIRE';
        const TYPE_PASSWORD_EXPIRE_TODAY = 'PASSWORD_EXPIRE_TODAY';

        let message = 'ALE_RESET_PASSWORD';
        let params = {};
        if (userData.EXPIRED_PASSWORD.includes(TYPE_PASSWORD_WILL_EXPIRE)) {
            const daysToExpire = userData.EXPIRED_PASSWORD.split('_')
                .pop();
            params = { days: daysToExpire };
            message = 'ALE_PASSWORD_WILL_EXPIRE';
            this.showDialogExpiredPassword(userData, message, params);
        } else if (userData.EXPIRED_PASSWORD.includes(TYPE_PASSWORD_EXPIRE_TODAY)) {
            message = 'ALE_PASSWORD_EXPIRE_TODAY';
            this.showDialogExpiredPassword(userData, message, params);
        } else {
            if (userData.EXPIRED_PASSWORD === TYPE_EXPIRED_PASSWORD) {
                message = 'ALE_EXPIRED_PASSWORD';
            }
            this.openExpiredPasswordWidget(userData, message);
        }
    }

    private redirectAfterLogin(userData: any) {
        LoadingService.show();
        this.setLogAccess(userData.USER, userData.IS_SUPPORT_OPERATOR)
            .then(() => {
                this.setLocalVarAfterLogin(userData);
				LoadingService.hide();
				this.redirectToProduct();
            }).catch(this.defaultError);
    }

    private setLocalVarAfterLogin(userData: any) {
        localStorage.setItem('LOGIN_TOKEN', userData.TOKEN);
        localStorage.setItem('LOGIN_USER', userData.USER);
        localStorage.setItem('LOGIN_USER_NAME', userData.USER_NAME);
    }

    private redirectToProduct() {
        if (this.isProduct) {
            this.redirectToProductFromComponent();
        } else {
            this.redirectToProductFromModule();
        }
    }

    private redirectToProductFromModule() {
        window.parent.postMessage({
            type: 'afterLogin',
            userData: this.getUserdata(),
        }, <string>localStorage.getItem('PRODUCT_URL'));
    }

    private redirectToProductFromComponent() {
        const event = new CustomEvent('afterLogin', {
            detail: {
                userData: this.getUserdata(),
            },
        });
        window.dispatchEvent(event);
    }

    private getUserdata(): object {
        return {
            loginToken: localStorage.getItem('LOGIN_TOKEN'),
            loginUser: localStorage.getItem('LOGIN_USER'),
            loginUserName: localStorage.getItem('LOGIN_USER_NAME'),
            loginLanguage: localStorage.getItem('LOGIN_LANGUAGE'),
            loginHash: localStorage.getItem('LOGIN_HASH'),
            loginKeepConnected: localStorage.getItem('LOGIN_KEEP_CONNECTED'),
        };
    }

    /** Services Messages */

    private showDialogExpiredPassword(userData: any, message: string, params: any) {
        DialogService.show({
            name: 'expired-password-dialog',
            type: 'warning',
            title: 'ALE_WARNING',
            text: I18n.translate(message, params),
            buttons: [
                {
                    name: 'no',
                    component: 'ZdButton',
                    label: 'NO',
                    events: {
                        click: (() => {
                            DialogService.hide();
                            this.redirectAfterLogin(userData);
                        }),
                    },
                    outline: true,
                },
                {
                    name: 'yes',
                    component: 'ZdButton',
                    label: 'YES',
                    events: {
                        click: (() => {
                            DialogService.hide();
                            this.openExpiredPasswordWidget(userData);
                        }),
                    },
                },
            ],
        });
    }

    private openExpiredPasswordWidget(userData: any, message?: string) {
        const formLogin = Metadata.getInstance<Form>('formLogin');
        const formExpiredPassword = Metadata.getInstance<Form>('formExpiredPassword');
        formExpiredPassword.value.expiredUser = userData.USER_EMAIL;
        formExpiredPassword.value.actualPassword = formLogin.value.password;
        this.showForm('formExpiredPassword');
        this.userData = userData;
        if (message) {
            this.showMessage(message);
        }
    }

    private showMessage(message: string, params: any = {}, type: string = 'warning', buttons?: IComponentRender[], text = '') {
        DialogService.show({
            name: 'login-dialog',
            type,
            title: `ALE_${type.toUpperCase()}`,
            text: text || I18n.translate(message, params),
            buttons: buttons || [
                {
                    name: 'ok',
                    component: 'ZdButton',
                    label: 'OK',
                    events: {
                        click: (() => {
                            DialogService.hide();
                        }),
                    },
                },
            ],
        });
    }
}
