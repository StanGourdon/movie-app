import castle from '../../../../assets/castle.jpg';

export const Main = ({ children }: { children: React.ReactNode }) => {
    return (
         <div
            className="min-h-screen bg-cover bg-center pt-8 px-14"
            style={{ backgroundImage: `url(${castle})` }}
        >
            {children}
        </div>
    );
};