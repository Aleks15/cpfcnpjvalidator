(function(){
var blackListCpf = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
    "12345678909"
];

 var blackListCnpj = [
    "00000000000000",
    "11111111111111",
    "22222222222222",
    "33333333333333",
    "44444444444444",
    "55555555555555",
    "66666666666666",
    "77777777777777",
    "88888888888888",
    "99999999999999"
];

function unformat(cpfOucnpj){
	return cpfOucnpj.replace(/\D/g, '');
}


function isInBlackList(blackList, cpfOucnpj){
	return blackList.some(function(element){
		return  element === unformat(cpfOucnpj);
	});
}

function firstNumber(cpf){
	for (var i = 0, multiply = 10, sum = 0; i < 9; i++, multiply--) {
		sum += Number(cpf.charAt(i)) * multiply;
	}
	return ((sum % 11 < 2) ? 0 : (11 - sum % 11)) ;
}

function secondNumber(cpf){
	for (var i = 0, multiply = 11, sum = 0; i < 10; i++, multiply--) {
		sum += Number(cpf.charAt(i)) * multiply;
	}
	return ((sum % 11 < 2) ? 0 : (11 - sum % 11)) ;
}

function validaCpf(cpf){
	var doc = unformat(cpf);
	if(doc.length !== 11 || isInBlackList(blackListCpf, doc))
		return false;
	
	return (firstNumber(doc) === Number(doc.charAt(9)) && secondNumber(doc) === Number(doc.charAt(10)));
	
}

function firstNumberCnpj(cnpj){
	for (var i = 0, multiply = 5, sum = 0; i < 12; i++, multiply--) {
		if(multiply < 2)
			multiply = 9;

		sum += Number(cnpj.charAt(i)) * multiply;
	}
	return ((sum % 11 < 2) ? 0 : (11 - sum % 11)) ;
}

function secondNumberCnpj(cnpj){
	for (var i = 0, multiply = 6, sum = 0; i < 13; i++, multiply--) {
		if(multiply < 2)
			multiply = 9;

		sum += Number(cnpj.charAt(i)) * multiply;
	}
	return ((sum % 11 < 2) ? 0 : (11 - sum % 11)) ;
}

function validaCnpj(cnpj){
	var doc = unformat(cnpj);
	if(doc.length !== 14 || isInBlackList(blackListCnpj, doc))
		return false;

	return (firstNumberCnpj(doc) === Number(doc.charAt(12)) && secondNumberCnpj(doc) === Number(doc.charAt(13)));
}

function maskCpf(cpf){
	return cpf.replace(/(\d{3})(\d{3})(\d{3})/,'$1.$2.$3-');
}

function maskCnpj(cnpj){
	return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-');
}

})();