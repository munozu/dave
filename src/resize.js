const defaultSettings = { width: 1024, height: 1024 }

export default function resize(bound, space, settings = defaultSettings) {
	const { element } = space
	const dpr = devicePixelRatio

	const maxWidth = bound.width 
	const maxHeight = bound.height
	
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

	element.width = canvasWidth 
	element.height = canvasHeight 
	element.style.width = styleWidth
	element.style.height = styleHeight
	element.style.margin= '0 auto'
	space.ctx.setTransform(scale, 0, 0, scale, origin.x, origin.y);
	return [styleWidth, styleHeight]
}
