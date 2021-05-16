import { Bound, Sound, Num, CanvasSpace, Pt, Group, Geom} from "pts"
import resize from './resize'

const { ctx: audio } = new Sound()
const space = new CanvasSpace('dave').setup({ bgcolor: "#bae", resize: true});
const form = space.getForm()
const settings = { width: 1000, height: 1000 }
const margin = 100

const b = new Bound()

space
	.add({
		start: (bound, space) => { 
		},
		animate: (time, frameTime, cs) => { 
			const [w, h] = b.size
			form.point(space.pointer, w/100, 'circle')
		},
		action: (type, x, y, event) => { 
			// code for interaction 
			if (type === "up") { // for safari
				if (audio.state === 'suspended') {
					audio.resume();
				}
			}
			
		},
		resize: (bound, event) => {
			b.size = resize(bound, space, settings)
		}
	})

space.bindMouse().bindTouch().play();
