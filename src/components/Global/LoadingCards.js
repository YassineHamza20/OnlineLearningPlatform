

export function ColumnLoading() {
    return (
        <div key="ColumnLoading" className="border bg-white shadow rounded-2xl px-6 py-5 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex flex-col space-y-4">
                <div className="rounded-full bg-darkg w-20 h-20 self-center"></div>
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-darkg rounded"></div>
                <div className="space-y-2">
                    <div className="h-2 bg-darkg rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
} 

export function RowLoading() {
    return (
        <div key="RowLOading" className="border bg-white shadow rounded-2xl px-6 py-5 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex items-center space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-2">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                </div>
                <div className="flex-grow"></div>
                <div className="rounded-full bg-darkg w-10 h-10 self-center"></div>
            </div>
        </div>
        
    )
}


export function ColumnRowLoading () {
    return (
        <div key="ColumRowLoading" className="border bg-white shadow rounded-2xl space-y-4 flex flex-col px-6 py-5 w-full mx-auto">
            <div className="animate-pulse flex items-center space-x-4">
                <div className="rounded-lg bg-darkg w-20 h-20 self-center"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                </div>
                <div className="rounded-full bg-darkg w-10 h-10 self-center"></div>
            </div>
            <hr className="h-1 w-full"></hr>
            <div className="animate-pulse flex items-center space-x-4">
                <div className="rounded-lg bg-darkg w-20 h-20 self-center"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                </div>
                <div className="rounded-full bg-darkg w-10 h-10 self-center"></div>
            </div>
            <hr className="h-1 w-full"></hr>
            <div className="animate-pulse flex items-center space-x-4">
                <div className="rounded-lg bg-darkg w-20 h-20 self-center"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                </div>
                <div className="rounded-full bg-darkg w-10 h-10 self-center"></div>
            </div>
            <hr className="h-1 w-full"></hr>
            <div className="animate-pulse flex items-center space-x-4">
                <div className="rounded-lg bg-darkg w-20 h-20 self-center"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                    <div className="space-y-2 w-[35%]">
                        <div className="h-2 bg-darkg rounded"></div>
                    </div>
                </div>
                <div className="rounded-full bg-darkg w-10 h-10 self-center"></div>
            </div>
        </div>
    )    
}

export function RowCardsLoading () {
    return (
        <div className="border bg-white shadow rounded-2xl space-y-4 flex flex-col px-6 py-5 w-full">
            <div className="animate-pulse flex items-center space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="space-y-2 w-[35%]">
                        <div className="h-5 bg-darkg rounded"></div>
                    </div>
                </div>
                <div className="rounded-2xl bg-darkg w-16 h-10 self-center"></div>
            </div>
            <hr className="h-1 w-full"></hr>
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col space-y-6 pb-3 w-[30%] rounded-3xl border hover:bg-lightg">
                    <div className="w-full h-36 object-cover rounded-t-3xl bg-darkg"></div>
                    <div className="flex flex-col space-y-3 px-5 cursor-pointer">
                        <div className="animate-pulse flex items-center space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse flex items-center space-x-1">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse flex items-center space-x-1">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-darkg w-16 h-10 self-center"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-6 pb-3 w-[30%] rounded-3xl border hover:bg-lightg">
                    <div className="w-full h-36 object-cover rounded-t-3xl bg-darkg"></div>
                    <div className="flex flex-col space-y-3 px-5 cursor-pointer">
                        <div className="animate-pulse flex items-center space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse flex items-center space-x-1">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse flex items-center space-x-1">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-darkg w-16 h-10 self-center"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-6 pb-3 w-[30%] rounded-3xl border hover:bg-lightg">
                    <div className="w-full h-36 object-cover rounded-t-3xl bg-darkg"></div>
                    <div className="flex flex-col space-y-3 px-5 cursor-pointer">
                        <div className="animate-pulse flex items-center space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse flex items-center space-x-1">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-pulse flex items-center space-x-1">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="space-y-2">
                                    <div className="h-2 bg-darkg rounded"></div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-darkg w-16 h-10 self-center"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function NotificationLoading() {
    return (<div key="RowLOading" className="bg-white z-40 rounded-2xl max-w-sm p-4 w-full ">
        <div className="animate-pulse flex items-center space-x-4">
            <div className="rounded-full bg-darkg w-16 h-16 self-center"></div>
            <div className="flex-1 space-y-6 py-1">
                <div className="space-y-2">
                    <div className="h-2 bg-darkg rounded"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-2 bg-darkg rounded"></div>
                </div>
            </div>
        </div>
    </div>)
}


export function CourseLoading() {
    return (
        <div className="flex flex-col h-72 space-y-6 pb-3 w-40 rounded-3xl border hover:bg-lightg">
            <div className="w-full h-36 object-cover rounded-t-3xl bg-darkg"></div>
            <div className="flex flex-col space-y-3 px-5 cursor-pointer">
                <div className="animate-pulse flex items-center space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-2">
                            <div className="h-2 bg-darkg rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse flex items-center space-x-1">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-2">
                            <div className="h-2 bg-darkg rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse flex items-center space-x-1">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-2">
                            <div className="h-2 bg-darkg rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}