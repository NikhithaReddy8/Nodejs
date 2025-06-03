interface Person{
    name: string;
    age: number;
}

let person: Person = {
    name: "nikhitha",
    age: 22
};

function personDetails(p: Person): void{
    console.log(`Name : ${p.name}`);
    console.log(`Age : ${p.age}`);
}

personDetails(person);

