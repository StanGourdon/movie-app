import castle from '../../../../assets/castle.jpg';

export const Main = ({ children }: { children: React.ReactNode }) => {
    return (
         <div
            className="min-h-screen w-full bg-cover bg-center pt-8 px-4 sm:px-8 md:px-14 overflow-x-hidden"
            style={{ backgroundImage: `url(${castle})` }}
        >
            {children}
        </div>
    );
};