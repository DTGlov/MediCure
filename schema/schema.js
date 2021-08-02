import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

import { doctors,patients } from "../dummyData.js";


const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    condition: { type: GraphQLString },
    gender: { type: GraphQLString },
    doctorId: { type: GraphQLID },
    doctor: {
      type: DoctorType,
      resolve(parent, args) {
        return doctors.find((doctor) => doctor.id === parent.doctorId);
      },
    },
  }),
});

const DoctorType = new GraphQLObjectType({
  name: "Doctor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    speciality: { type: GraphQLString },
    address: { type: GraphQLString },
    patients: {
          type: new GraphQLList( PatientType),
        resolve(parent, args) {
              return patients.filter((patient) => patient.doctorId === parent.id)
              
              
          }
    }
  }),
});



 const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    doctor: {
      type: DoctorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return doctors.find((item) => item.id === args.id);
      },
    },
    patient: {
      type: PatientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return patients.find((item) => item.id === args.id);
      },
    },
    patientAbove50: {
      type: new GraphQLList(PatientType),
      resolve(parent, args) {
        return patients.filter((item) => item.age > 50);
      },
    },
    patientBySex: {
        type: new GraphQLList(PatientType),
        args: { gender: { type: GraphQLString } },
        resolve(parent, args) {
             return patients.filter((patient)=>patient.gender===args.gender.toUpperCase())
      },
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      resolve(parent, args) {
        return doctors;
      },
    },
    patients: {
      type: new GraphQLList(PatientType),
      resolve(parent, args) {
        return patients;
      },
    },
  },
 });

export const schema = new GraphQLSchema({
     query:RootQuery
 })