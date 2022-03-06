import { ref, onMounted, onUnmounted } from 'vue'

// -- GEOLOCALIZATION -- //

export function useDeviceGeolocalization() {
    const defaultCenter = [46.5170798, 6.6270042]
    let watchPositionID = null

    // Refs
    let userLatitude = ref(defaultCenter[0])
    let userLongitude = ref(defaultCenter[1])

    // refreshing Opitions
    const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    };

    const errorHandler = (err) => {
        if(err.code == 1) {
            alert("Error: Access is denied!");
        } else if( err.code == 2) {
            alert("Error: Position is unavailable!");
        }
    }

    // Update user position
    const updateDevicePosition = (position) => {
        // if position available, if not keep the old one
        userLatitude.value = position.coords.latitude ? position.coords.latitude : userLatitude.value;
        userLongitude.value = position.coords.longitude ? position.coords.longitude : userLongitude.value;
    }

    // Watch user position
    onMounted(() => {
        if (navigator.geolocation) {
            watchPositionID = navigator.geolocation.watchPosition(
                updateDevicePosition, 
                errorHandler,
                geolocationOptions);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    })
    onUnmounted(() => navigator.geolocation.clearWatch(watchPositionID))

    // expose managed state as return value
    return { userLatitude, userLongitude }
}

// -- ORIENTATION -- //
export function useDeviceOrientation() {
    
    // Refs
    let userPan = ref(0)
    let userTilt = ref(0)
    let userGamma = ref(0)

    let compassCorrection = ref(0)
    let userPanSaved = ref(0)
    let isCorrectionOnGoing = ref(false)


    // Update device orientation
    const updateDeviceOrientation = (event) => { 
        // Fet orientation value if exist if not keep the old one
        userTilt.value = event.beta ? Math.round(event.beta - 90) : userTilt.value
        userPan.value = event.alpha ? Math.round(Math.abs(360 - event.alpha)) : userPan.value
        userGamma.value = event.gamma ? event.gamma : userGamma.value
        
        // Check if phone is vertical to switch to non absolute orientation because of inversion 
        if (userTilt.value > -15) {
            if (!isCorrectionOnGoing.value) {
                userPanSaved.value = userPan.value
                window.addEventListener('deviceorientation', handleOrientation)
            }
            // Calculate if need to add or substract to the current orientation
            if (compassCorrection.value>180) {
                userPan.value = Math.round(userPanSaved.value - Math.abs(compassCorrection.value - 360)) % 360
                return
            }
                
            userPan.value = Math.round(Math.abs(userPanSaved.value + compassCorrection.value)) % 360

        } else {
            if (!isCorrectionOnGoing.value) {
                window.removeEventListener('deviceorientation', handleOrientation);
                isCorrectionOnGoing.value = false
                compassCorrection.value = 0
            }
        }
    }

    // Calculate compass according to local phone orientation 
    function compassHeading(alpha, beta, gamma) {

        // Convert degrees to radians
        var alphaRad = alpha * (Math.PI / 180);
        var betaRad = beta * (Math.PI / 180);
        var gammaRad = gamma * (Math.PI / 180);

        // Calculate equation components
        var cA = Math.cos(alphaRad);
        var sA = Math.sin(alphaRad);
        var cB = Math.cos(betaRad);
        var sB = Math.sin(betaRad);
        var cG = Math.cos(gammaRad);
        var sG = Math.sin(gammaRad);

        // Calculate A, B, C rotation components
        var rA = - cA * sG - sA * sB * cG;
        var rB = - sA * sG + cA * sB * cG;
        var rC = - cB * cG;

        // Calculate compass heading
        var compassHeading = Math.atan(rA / rB);

        // Convert from half unit circle to whole unit circle
        if(rB < 0) {
            compassHeading += Math.PI;
        }else if(rA < 0) {
            compassHeading += 2 * Math.PI;
        }

        // Convert radians to degrees
        compassHeading *= 180 / Math.PI;

        return compassHeading;

    }

    const handleOrientation = (event) => {
        isCorrectionOnGoing.value = true
        compassCorrection.value = compassHeading(event.alpha, event.beta, event.gamma)
    }

    // Watch devise orientation
    onMounted(() => {
        if ('ondeviceorientationabsolute' in window && 'ondeviceorientation' in window) {
            window.addEventListener("deviceorientationabsolute", updateDeviceOrientation, true);
        } else {
            alert("Device orientation is not supported by this browser.");
        }
    })
    onUnmounted(() => {
        window.removeEventListener('deviceorientationabsolute', updateDeviceOrientation)
        window.removeEventListener('deviceorientation', handleOrientation)
    })

    // expose managed state as return value
    return { userPan, userTilt, userGamma }
}