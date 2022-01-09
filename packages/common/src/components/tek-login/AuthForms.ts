import { IComponentRender } from '@zeedhi/common';
import { TekLogin as TekLoginClass } from './TekLogin';

export function getAuthForms(TekLogin: TekLoginClass): IComponentRender[] {
    return [
        {
            name: 'formLogin',
            component: 'ZdForm',
            children: [
                {
                    name: 'user',
                    component: 'ZdTextInput',
                    dense: false,
                    label: 'LOGIN_USER',
                    value: '',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnter.bind(TekLogin),
                    },
                },
                {
                    id: 'PASSWORD',
                    name: 'password',
                    component: 'ZdPassword',
                    dense: false,
                    label: 'LOGIN_PASSWORD',
                    value: '',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnter.bind(TekLogin),
                    },
                },
                {
                    name: 'login',
                    component: 'ZdButton',
                    label: 'LOGIN_SIGN_IN',
                    color: 'primary',
                    width: '100%',
                    grid: {
                        cols: 12,
                    },
                    events: {
                        click: TekLogin.loginClick.bind(TekLogin),
                    },
                },
                {
                    name: 'privacy',
                    component: 'ZdText',
                    text: 'LOGIN_PRIVACY',
                    cssClass: 'zd-mt-3',
                    tag: 'a',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.privacyClick.bind(TekLogin),
                    },
                },
                {
                    name: 'forget',
                    component: 'ZdText',
                    text: 'LOGIN_FORGET',
                    cssClass: 'zd-mt-3 zd-text-right',
                    tag: 'a',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.forgetClick.bind(TekLogin),
                    },
                },
                {
                    name: 'divider',
                    component: 'ZdDivider',
                    cssClass: 'zd-my-3',
                    grid: {
                        cols: 12,
                    },
                },
                {
                    name: 'keep-connected',
                    component: 'ZdCheckbox',
                    dense: true,
                    falseValue: 'No',
                    trueValue: 'Yes',
                    label: 'LOGIN_KEEP_CONNECTED',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        change: TekLogin.changeKeepConnected.bind(TekLogin),
                    },
                },
                {
                    name: 'language-select',
                    component: 'ZdSelect',
                    dense: false,
                    autocomplete: false,
                    showLabel: false,
                    showHelper: false,
                    clearable: false,
                    dataValue: 'SHORT_NAME',
                    dataText: 'NAME',
                    grid: {
                        cols: 6,
                    },
                    datasource: {
                        data: [
                            {
                                NAME: 'Português (Brasil)',
                                SHORT_NAME: 'pt_br'
                            },
                            {
                                NAME: 'English (USA)',
                                SHORT_NAME: 'en_us'
                            },
                        ],
                    },
                    events: {
                        change: TekLogin.changeLanguage.bind(TekLogin),
                    },
                },
            ],
        },
        {
            name: 'formExpiredPassword',
            component: 'ZdForm',
            isVisible: false,
            children: [
                {
                    name: 'expiredText',
                    component: 'ZdText',
                    text: 'LOGIN_UPDATE_PASSWORD',
                    tag: 'h3',
                },
                {
                    name: 'expiredUser',
                    component: 'ZdTextInput',
                    dense: false,
                    label: 'LOGIN_USER',
                    disabled: true,
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                },
                {
                    name: 'actualPassword',
                    component: 'ZdPassword',
                    dense: false,
                    label: 'LOGIN_ACTUAL_PASSWORD',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnterExpiredPasswordConfirm.bind(TekLogin),
                    },
                },
                {
                    name: 'newPassword',
                    component: 'ZdPassword',
                    dense: false,
                    label: 'LOGIN_NEW_PASSWORD',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnterExpiredPasswordConfirm.bind(TekLogin),
                    },
                },
                {
                    name: 'confirmPassword',
                    component: 'ZdPassword',
                    dense: false,
                    label: 'LOGIN_CONFIRM_NEW_PASSWORD',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnterExpiredPasswordConfirm.bind(TekLogin),
                    },
                },
                {
                    name: 'cancelExpiredPassword',
                    component: 'ZdButton',
                    label: 'LOGIN_CANCEL',
                    color: 'primary',
                    outline: true,
                    width: '100%',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.loginExpiredPasswordCancel.bind(TekLogin),
                    },
                },
                {
                    name: 'confirmExpiredPassword',
                    component: 'ZdButton',
                    label: 'LOGIN_CONFIRM',
                    color: 'primary',
                    width: '100%',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.loginExpiredPasswordConfirm.bind(TekLogin),
                    },
                },
            ],
        },
        {
            name: 'formForgetPassword',
            component: 'ZdForm',
            isVisible: false,
            children: [
                {
                    name: 'forgetText',
                    component: 'ZdText',
                    text: 'LOGIN_FORGET_PASSWORD',
                    tag: 'h3',
                },
                {
                    name: 'email',
                    component: 'ZdTextInput',
                    dense: false,
                    label: 'LOGIN_EMAIL',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnterForgetPasswordConfirm.bind(TekLogin),
                    },
                },
                {
                    name: 'cancelForgetPassword',
                    component: 'ZdButton',
                    label: 'LOGIN_CANCEL',
                    color: 'primary',
                    outline: true,
                    width: '100%',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.loginForgetPasswordCancel.bind(TekLogin),
                    },
                },
                {
                    name: 'confirmForgetPassword',
                    component: 'ZdButton',
                    label: 'LOGIN_CONFIRM',
                    color: 'primary',
                    width: '100%',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.loginForgetPasswordConfirm.bind(TekLogin),
                    },
                },
            ],
        },
        {
            name: 'formEmailPrivacyPolicy',
            component: 'ZdForm',
            isVisible: false,
            children: [
                {
                    name: 'emailPrivacyText',
                    component: 'ZdText',
                    text: 'LOGIN_EMAIL_PRIVACY_POLICY',
                    tag: 'h3',
                },
                {
                    name: 'privacyPolicyEmail',
                    component: 'ZdTextInput',
                    dense: false,
                    label: 'LOGIN_EMAIL',
                    grid: {
                        cols: 12,
                    },
                    validations: {
                        required: {},
                    },
                    events: {
                        keydown: TekLogin.loginKeyEnterEmailPrivacyPolicyConfirm.bind(TekLogin),
                    },
                },
                {
                    name: 'cancelEmailPrivacyPolicy',
                    component: 'ZdButton',
                    label: 'LOGIN_CANCEL',
                    color: 'primary',
                    outline: true,
                    width: '100%',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.loginEmailPrivacyPolicyCancel.bind(TekLogin),
                    },
                },
                {
                    name: 'confirmEmailPrivacyPolicy',
                    component: 'ZdButton',
                    label: 'LOGIN_CONFIRM',
                    color: 'primary',
                    width: '100%',
                    grid: {
                        cols: 6,
                    },
                    events: {
                        click: TekLogin.loginEmailPrivacyPolicyConfirm.bind(TekLogin),
                    },
                },
            ],
        },
    ];
}
