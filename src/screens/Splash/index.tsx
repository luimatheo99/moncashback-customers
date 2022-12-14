import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
// import Animated, {
//     useSharedValue,
//     useAnimatedStyle,
//     withTiming,
//     interpolate,
//     Extrapolate,
//     runOnJS,
// } from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSplashSvg from '../../assets/logo_splash.svg';
import { Container } from './styles';

export function Splash() {
    // const splashAnimation = useSharedValue(0);
    const navigation = useNavigation();

    // const brandStyle = useAnimatedStyle(() => {
    //     return {
    //         opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
    //         transform: [
    //             {
    //                 translateX: interpolate(
    //                     splashAnimation.value,
    //                     [0, 50],
    //                     [0, -50],
    //                     Extrapolate.CLAMP,
    //                 ),
    //             },
    //         ],
    //     };
    // });

    // const logoStyle = useAnimatedStyle(() => {
    //     return {
    //         opacity: interpolate(
    //             splashAnimation.value,
    //             [0, 25, 50],
    //             [0, 0.3, 1],
    //         ),
    //         transform: [
    //             {
    //                 translateX: interpolate(
    //                     splashAnimation.value,
    //                     [0, 50],
    //                     [-50, 0],
    //                     Extrapolate.CLAMP,
    //                 ),
    //             },
    //         ],
    //     };
    // });

    function startApp() {
        navigation.navigate('SignIn' as any);
    }

    useEffect(() => {
        startApp();
        // splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
        //     'worklet';

        //     runOnJS(startApp)();
        // });
    }, []);

    return (
        <Container>
            <LogoSplashSvg width={300} height={300} />
            {/* <Animated.View style={[brandStyle, { position: 'absolute' }]}>
                <BrandSvg width={240} height={240} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSplashSvg width={240} height={240} />
            </Animated.View> */}
        </Container>
    );
}
