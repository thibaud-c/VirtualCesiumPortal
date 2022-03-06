import { ref } from 'vue'

// Refs
export let isRecording = ref(false)
export let isAudio = ref(false)

let mediaRecorder = null
let userAudio = null

// Recording Handler in audio blob
const recordAudio = () => {
    return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            let audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            const start = () => {
                audioChunks = []
                mediaRecorder.start();
            };

            const stop = () => {
                return new Promise(resolve => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => {
                            audio.play();
                        };

                        resolve({ audioBlob, audioUrl, play });
                    });

                    mediaRecorder.stop();
                });
            };

            resolve({ start, stop });
        });
    });
};

// Launch functionnality
let recorder 

(async () => {
    recorder = await recordAudio();
})()

// Transform audio to base64
const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

export async function StartStopRecording () {
    if (mediaRecorder.state === "inactive") {
        recorder.start();
        isRecording.value = true;
        return;
    }
    userAudio = await recorder.stop();
    isRecording.value = false;
    isAudio.value = true;
}

export function playAudio () {
    if (userAudio) {
        userAudio.play();
    }
}

export function deleteAudio() {
    userAudio = null;
    isAudio.value = false
}

export async function getAudio() {
    if (!userAudio) {
        return null
    }

    const base64String = await convertBlobToBase64(userAudio.audioBlob);
    return base64String
}