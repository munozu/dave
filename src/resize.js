const defaultSettings = { width: 1024, height: 1024 }

export default function resize({ ctx, canvas }, settings = defaultSettings) {
	const dpr = devicePixelRatio

	const maxWidth = window.innerWidth
	const maxHeight = window.innerHeight
	
	const canvasWidth = settings.width * dpr
	const canvasHeight = settings.height * dpr

	let styleWidth = settings.width
	let styleHeight = settings.height

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
