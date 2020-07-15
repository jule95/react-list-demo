const personsBaseUrl = "http://localhost:3000";
const timeBaseUrl = "https://worldtimeapi.org/api/timezone";

//get time
export async function getTime()
{
    const resp = await fetch(`${timeBaseUrl}/Europe/London`);

    return await resp.json();
}

//create
export async function create(person)
{
    const resp = await fetch(`${personsBaseUrl}/persons`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    });

    return await resp.json();
}

//read
export async function get()
{
    const resp = await fetch(`${personsBaseUrl}/persons`);

    return await resp.json();
}

//update
export async function update(id, person)
{
    const resp = await fetch(`${personsBaseUrl}/persons/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    });

    return await resp.json();
}

//delete
export async function remove(id)
{
    const resp = await fetch(`${personsBaseUrl}/persons/${id}`, {
        method: "DELETE"
    });

    return await resp.json();
}