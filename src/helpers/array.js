//create
export function add(arr, element)
{
    arr.unshift(element);

    return arr;
}

//update
export function update(arr, element)
{
    arr.forEach((el, index) =>
    {
        if (element.id === el.id)
        {
            arr.splice(index, 1, element);
        }
    });

    return arr;
}

//delete
export function remove(arr, id)
{
    arr.forEach((el, index) =>
    {
        if (id === el.id)
        {
            arr.splice(index, 1);
        }
    });

    return arr;
}

//filter
export function filter(arr, filter)
{
    arr = arr.filter((el) =>
    {
        return el.name.toLowerCase().includes(filter.toLowerCase());
    });

    return arr;
}

//sort
export function sort(arr, now)
{
    return arr.sort(el => {
        return new Date(el.creation * 1000) - new Date(now * 1000);
    });
}