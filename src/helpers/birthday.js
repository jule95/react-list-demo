export function getAge(dateOfBirth)
{
    const now = new Date();
    const dobArr = dateOfBirth.split(".");
    const dob = new Date(dobArr[2], dobArr[1] - 1, dobArr[0]);

    const data = {
        currentMonth: now.getMonth(),
        currentDate: now.getDate(),
        birthdayMonth: dob.getMonth(),
        birthdayDate: dob.getDate()
    };

    let age = now.getFullYear() - dob.getFullYear();

    //check if user has already had his birthday for this year
    if (data.birthdayMonth > data.currentMonth && data.birthdayDate > data.currentDate)
    {
        //-1 if he did not
        age--;
    }

    return age;
}

export function updateAge(persons)
{
    persons = persons.map(person =>
    {
        person.age = getAge(person.dob);

        return person;
    });

    return persons;
}