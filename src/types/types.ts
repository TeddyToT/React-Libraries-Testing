type User = {
id: string;
name: string;
age: number;
email: string;
phone: string;
createdAt: Date;
};

type ContactInfo = Pick<User, "email" | "phone">;

const contactSources: ContactInfo = {
email: "person@mail.com",
phone: "4445556666",

};

type UserInfo = Omit<User, "id" |"createdAt">;

const infoSource: UserInfo = {
email: "person@mail.com",
phone: "4445556666",
age:20,
name:"Bruh"

};

export type Role = "user" | "admin" | null;

export type CoffeeSale = {
    date: string;
    datetime: string,
    hour_of_day: string,
    cash_type: string,
    card: string,
    money: string,
    coffee_name: string,
    Time_of_Day: string,
    Weekday: string,
    Month_name: string,
    Weekdaysort: string,
    Monthsort: string
}

export type CoffeeRevunue = CoffeeSale[]
