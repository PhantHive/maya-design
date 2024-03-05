import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const useSwipeBehavior = (constellationsLength: number) => {
    const [currentConstellation, setCurrentConstellation] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () =>
            setCurrentConstellation((prev) =>
                prev < constellationsLength - 1 ? prev + 1 : 0,
            ),
        onSwipedRight: () =>
            setCurrentConstellation((prev) =>
                prev > 0 ? prev - 1 : constellationsLength - 1,
            ),
        trackMouse: true,
    });

    return { currentConstellation, handlers };
};

export default useSwipeBehavior;
