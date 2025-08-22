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