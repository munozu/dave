
class NoiseWorklet extends AudioWorkletProcessor {
	constructor(options) {
		super(options)
		this.phase = 0.0
		this.frequency = 440
		this.port.onmessage = ev => this.frequency = ev.data
	}
	process(inputs, outputs, params){
		const output = outputs[0];
		const channel = output[0]
		for(let i = 0; i < 128; i++) {
			channel[i] = 0.5 * Math.sin(this.phase * 2 * Math.PI)
			this.phase += this.frequency / 48000
		}
		return true
	}
}

registerProcessor('noise-processor', NoiseWorklet);
