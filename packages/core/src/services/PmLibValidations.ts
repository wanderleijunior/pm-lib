export class PmLibValidations {
	public static validateCpf(cpf: string) {
		if (cpf === undefined || cpf === null) {
			return false;
		}

		const cpfString = cpf.toString().replace(/[\D]+/g, '');

		if (cpfString.length !== 11) {
			return false;
		}

		if (cpfString === '00000000000'
			|| cpfString === '11111111111'
			|| cpfString === '22222222222'
			|| cpfString === '33333333333'
			|| cpfString === '44444444444'
			|| cpfString === '55555555555'
			|| cpfString === '66666666666'
			|| cpfString === '77777777777'
			|| cpfString === '88888888888'
			|| cpfString === '99999999999') {
			return false;
		}

		let sum = 0;
		let rest = 0;

		for (let i = 1; i <= 9; i += 1) {
			sum += parseInt(cpfString.substring(i - 1, i), 10) * (11 - i);
		}

		rest = (sum * 10) % 11;

		if ((rest === 10) || (rest === 11)) {
			rest = 0;
		}

		if (rest !== parseInt(cpfString.substring(9, 10), 10)) {
			return false;
		}

		sum = 0;
		for (let i = 1; i <= 10; i += 1) {
			sum += parseInt(cpfString.substring(i - 1, i), 10) * (12 - i);
		}
		rest = (sum * 10) % 11;

		if ((rest === 10) || (rest === 11)) {
			rest = 0;
		}

		return rest === parseInt(cpfString.substring(10, 11), 10);
	}
}
