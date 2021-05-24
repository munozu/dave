const defaultSettings = [1024, 1024] 

export default function resize({ ctx, canvas }, dimensions = defaultSettings) {
	const [width, height] = dimensions;
	const dpr = devicePixelRatio

	const maxWidth = window.innerWidth
	const maxHeight = window.innerHeight
	
	const canvasWidth = width * dpr
	const canvasHeight = height * dpr

	let styleWidth = width
	let styleHeight = height

	const aspect = canvasWidth / canvasHeight;
	const windowAspect = maxWidth / maxHeight;

	if (styleWidth > maxWidth || styleHeight > maxHeight) {
		if (windowAspect > aspect) {
			styleHeight = maxHeight;
			styleWidth = styleHeight * aspect
		} else {
			styleWidth = maxWidth;
			styleHeight = styleWidth / aspect
		}
	}

	const scale = Math.min(canvasWidth/styleWidth, canvasHeight/styleHeight)
	const origin = {
		x:(canvasWidth - styleWidth * scale)/2,
		y:(canvasHeight - styleHeight *scale)/2
	}

	canvas.width = canvasWidth 
	canvas.height = canvasHeight 
	canvas.style.width = styleWidth
	canvas.style.height = styleHeight
	ctx.setTransform(scale, 0, 0, scale, origin.x, origin.y);
	return [styleWidth, styleHeight]
}
