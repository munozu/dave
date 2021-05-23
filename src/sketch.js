const TAU = Math.PI*2

export function sketch({ ctx, audio, width, height }) {
	return (t, ft, [w, h]) => {
		ctx.fillStyle = 'salmon';
		ctx.fillRect(0,0,w,h);

		ctx.fillStyle = 'cornflowerblue';
		ctx.beginPath();
		ctx.arc(w/2,h/2, w/5, 0, TAU);
		ctx.fill()
	}
}
