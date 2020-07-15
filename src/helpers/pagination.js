export function getTotalPages(personsToDisplay, persons, personsPerPage)
{
    if (personsToDisplay)
    {
        return Math.ceil(personsToDisplay.length / personsPerPage)
    }

    return Math.ceil(persons.length / personsPerPage)
}