import rnd from 'canvas-sketch-util/random'
import * as Tone from 'tone'
import {ToneConstantSource} from 'tone/build/esm/signal/ToneConstantSource'

export function sketch({ ctx, width, height }) {
	const source = new ToneConstantSource().start()
	const meter = new Tone.Meter(0.1)
	source.connect(meter)
	meter.set({normalRange: true})
	const synth = new Tone.PolySynth(Tone.MonoSynth)
	synth.set({ envelope: { attack: 0.001, decay: 1, sustain: 0.2, release: 1 } })
	const filter =  new Tone.Filter(220, 'lowpass').toDestination()
	filter.set({ Q: 1 })
	synth.connect(filter)

	const seq = new Tone.Loop((time) => {
		const note = Tone.Frequency(meter.getValue()+1).toNote()
		synth.triggerAttackRelease(note, 0.2, time, Math.random())
	}, '16n')

	// seq.start();
	// Tone.Transport.start()

	return (t, ft) => {
		ctx.fillStyle = '#333'
		ctx.fillRect(0, 0, width, height)

		ctx.fillStyle = 'white'
		const value = rnd.noise1D(t%4000/4000, 4, 1)
		source.offset.setValueAtTime(value*height, Tone.now())
		ctx.fillRect(0, meter.getValue(), width, 2)

		ctx.fillStyle = '#fff3'
		ctx.fillRect(0, height/2, width, 2)

		ctx.fillStyle = 'white'
		ctx.fillText(meter.getValue(), width/2, height-40)
	}
}

export const settings = {
	dimensions: [2048, 2048],
	animate: true
}

