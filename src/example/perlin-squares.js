import random  from 'canvas-sketch-util/random'
import { lerp } from 'canvas-sketch-util/math'

export function sketch({ ctx, width, height }) {
	const margin = width/4
	const grid = []
	const count = 64
	for(let x = 0; x < count; x++){
		for(let y = 0; y < count; y++){
			const u = count <= 1 ? 0.5 : (x / (count - 1))
			const v = count <= 1 ? 0.5 : (y / (count - 1))
			grid.push({
				color: Math.max(0.2,Math.abs(random.noise2D(u , v, 0.5, 2)))*100, 
				rotate: Math.abs(random.noise2D(u,v))*0.4,
				pos: [u, v]
			})
		}
	}
	return (t, ft) => {
		ctx.fillStyle = '#333'
		ctx.fillRect(0, 0, width, height)

		grid.forEach(pt => {
			const x = lerp(margin, width-margin, pt.pos[0]);
			const y = lerp(margin, height-margin, pt.pos[1]);
			ctx.save()
			ctx.rotate(pt.rotate)
			ctx.strokeStyle = '#333'
			ctx.strokeWidth =  '1px'
			ctx.fillStyle = `hsla(300, 20%, ${pt.color}%, 0.95)`;
			ctx.fillRect(x-6, y-6, 12, 12)
			ctx.strokeRect(x-6, y-6, 12, 12)
			ctx.restore()
		})

	}
}

export const settings = {
	dimensions: [2048, 2048],
	// animate: true
}
