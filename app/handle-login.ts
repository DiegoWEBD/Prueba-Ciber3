export const loginUser = () => {
	const userInput = '2 + 2'
	const result = eval(userInput) // 🚨 Usar eval() es una mala práctica y vulnerable
	console.log('Resultado:', result)
}
