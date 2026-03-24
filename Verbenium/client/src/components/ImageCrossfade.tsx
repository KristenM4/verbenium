interface Props {
    current: string | null;
    next: string | null;
    isFading: boolean;
}

export function ImageCrossfade({ current, next, isFading }: Props) {
    if (!current && !next) return null;
    return (
        <div className="relative mx-auto max-h-[600px] w-full flex-shrink-0">
            {current && <img src={current} className="block w-full" />}
            {next && (
                <img
                    src={next}
                    className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${isFading ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            )}
        </div>
    );
}