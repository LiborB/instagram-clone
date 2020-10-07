function intlFormat(num: number)
{
    return new Intl.NumberFormat().format(Math.round(num*10)/10);
}
export function makeFriendly(num: number)
{
    console.log(num)
    if(num >= 1000000)
        return intlFormat(num/1000000)+'M';
    if(num >= 1000)
        return intlFormat(num/1000)+'k';
    return intlFormat(num);
}
