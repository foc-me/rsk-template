function nil(target: any): target is null | undefined {
    return target === null || target === undefined
}

function nilEmpty(target: any): target is null | undefined | "" {
    return nil(target) || target === ""
}

export { nil, nilEmpty }