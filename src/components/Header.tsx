import { ReactTyped } from 'react-typed';

export const Header = () => {
    const texts = ['Maya', 'Hi!', 'Look around'];

    return (
        <header>
            <h1>
                <ReactTyped
                    strings={texts}
                    typeSpeed={100}
                    backSpeed={50}
                    loop
                />
            </h1>
        </header>
    );
};
