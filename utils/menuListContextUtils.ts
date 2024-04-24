export { }

export function OnAddingAnimationEffect(id: any, setOnAddingAnimationEffect: any) {
    setOnAddingAnimationEffect({
        style: {
            transform: "scale(1.1) rotate(-2deg)",
        },
        itemId: id
    })
    setTimeout(() => {
        setOnAddingAnimationEffect({
            style: {},
            itemId: id
        })
    }, 100)
}