// Function that rounds given n to nearest number rounding.
// e.g. rounds n 7.5 to 10 if rounding = 10. 
export default (n, rounding) => {
	return Math.round(n/rounding)*rounding
}