function Logo () {
    return (
        <div className="text-left">
            <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="w-12 h-12 shadow-lg rounded-full object-cover"/>
                <span className="text-xl font-semibold">Linguify</span>
            </div>
            <p className="text-2xl font-extrabold mt-4">Welcome back!</p>
        </div>

    );

}

export default Logo;