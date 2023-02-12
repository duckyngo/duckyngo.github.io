--- 
slug: the-tts-pipeline
title: The TTS pipeline
date: 2023-02-12

tags: 

  - TTS
  - NLP
  - Speech System

--- 


A Text-to-Speech(TTS) or Speech synthesis is a technology that enables a computer to read text out loud. The resulting audio often sounds like a human voice. Typically, TTS systems generate speech that sounds like the speaker whose audio they were trained on and the quality of generated audio depends on the TTS model used and training dataset.

![The inference pipeline for TTS audio models ([https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/neural-text-to-speech-previews-five-new-languages-with/ba-p/1907604](https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/neural-text-to-speech-previews-five-new-languages-with/ba-p/1907604))](images/Untitled.png)

The inference pipeline for TTS audio models ([https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/neural-text-to-speech-previews-five-new-languages-with/ba-p/1907604](https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/neural-text-to-speech-previews-five-new-languages-with/ba-p/1907604))

The TTS pipeline typically includes following steps:

1. Text preprocessing: In this step, the text input is cleaned, normalize and converting to spoken text (eg. “mrs” → “miss”, “2.4” → “two point four”)
2. Text/Grapheme-to-Phoneme conversion (G2P): In this step, the basic units of text is transformed into basic units of spoken phonemes (spoken language).
3. Spectrogram Synthesis: In this step, the text/phonemes information is used to synthesize the speech signal (or spectrogram). Models which do this are **Neural acoustic model**
4. Audio Synthesis: In this step, the generated spectrogram is transformed into audio. This step also known as **spectrogram inversion.** We call the model which handle this task is ****************vocoders****************


### Keywords/ Terminologies:
Spectrogram Synthesis: Spectrogram synthesis is a process in TTS (Text-to-Speech) technology that generates a speech signal, also known as a spectrogram, from text or phoneme information. The spectrogram is a representation of the sound signal in terms of frequency and time, and it provides information about the frequency components of the speech signal.

Neural Acoustic Model: A neural acoustic model is a type of machine learning model used in TTS technology to perform spectrogram synthesis. This model uses deep neural networks to generate a speech signal from text or phoneme information, and it can be trained on large amounts of speech data to produce high-quality speech signals.

Spectrogram Inversion: Spectrogram inversion is a process in TTS technology that transforms a spectrogram into audio. This process involves reconstructing the time-domain waveform from the frequency-domain representation of the speech signal, and it is typically performed using digital signal processing techniques.

Vocoders: A vocoder is a model used in TTS technology to perform spectrogram inversion. This model transforms the spectrogram into audio by generating a time-domain waveform that represents the speech signal. Vocoders can be based on a variety of algorithms, including linear prediction, codebook-based methods, and deep neural networks.

### Reference
[Inference Pipeline][https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/neural-text-to-speech-previews-five-new-languages-with/ba-p/1907604](https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/neural-text-to-speech-previews-five-new-languages-with/ba-p/1907604)