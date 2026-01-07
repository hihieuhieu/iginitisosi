- hardware: microphone + arduino; speakers
- software: microphone audio signal input, dsp'd signal output

Interface:
- reactjs, anvil, ...?
- live signal in time and frequency domain
- impulse/frequency response of currently applied/selected filter
- buttons:
  - increase volume
  - cutoff frequencies, filter parameters
  - distortions
- input signal
- possibility of application of filter for certain time periods
- lows, mids, highs and respective frequency cutoffs, steepnesses (dB)

___

Frontend: React
Backend: Python

Frontend components:
- BUTTON: Upload signal / add signal chunk (.wav file)
- BUTTON: Record signal / add signal chunk (create .wav file from signal input port, e.g. microphone)
- BUTTON: Create signal / add signal chunk (create .wav file from various sound elements)
- PLOT: Uploaded/recorded/created signal chunk, time domain
- PLOT: Uploaded/recorded/created signal chunk, frequency domain
- PLOT: Currently selected filter, time domain
- PLOT: Currently selected filter, frequency domain
- PLOT: (big plot) entire signal, time domain
- PLOT: (big plot) entire signal, frequency domain (STFT)
- ILLUSTRATION: Signal chunks and applied filters (time scale)
- MENU: Selection of filters
- BUTTON: Filters - Switch between Euler and Cartesian (Magnitude and Phase, Real and Imaginary part)
- SLIDER: STFT Delta time
- SLIDER(s): Filter coefficients and properties (gain, phase shift, transition bandwidth, sampling rate, cut off frequency, ...)
- BUTTON: Apply filter
- BUTTON: Play filtered signal chunk
- BUTTON: Play entire signal

Backend components:



- 
