module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.5). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateBus {
  count: Int!
}

type AggregateEvent {
  count: Int!
}

type AggregateRoute {
  count: Int!
}

type AggregateStop {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Bus {
  id: ID!
  startTime: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
  route: Route!
  eventList(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
}

type BusConnection {
  pageInfo: PageInfo!
  edges: [BusEdge]!
  aggregate: AggregateBus!
}

input BusCreateInput {
  id: ID
  startTime: DateTime!
  route: RouteCreateOneInput!
  eventList: EventCreateManyWithoutBusInput
}

input BusCreateOneWithoutEventListInput {
  create: BusCreateWithoutEventListInput
  connect: BusWhereUniqueInput
}

input BusCreateWithoutEventListInput {
  id: ID
  startTime: DateTime!
  route: RouteCreateOneInput!
}

type BusEdge {
  node: Bus!
  cursor: String!
}

enum BusOrderByInput {
  id_ASC
  id_DESC
  startTime_ASC
  startTime_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BusPreviousValues {
  id: ID!
  startTime: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type BusSubscriptionPayload {
  mutation: MutationType!
  node: Bus
  updatedFields: [String!]
  previousValues: BusPreviousValues
}

input BusSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BusWhereInput
  AND: [BusSubscriptionWhereInput!]
  OR: [BusSubscriptionWhereInput!]
  NOT: [BusSubscriptionWhereInput!]
}

input BusUpdateInput {
  startTime: DateTime
  route: RouteUpdateOneRequiredInput
  eventList: EventUpdateManyWithoutBusInput
}

input BusUpdateManyMutationInput {
  startTime: DateTime
}

input BusUpdateOneRequiredWithoutEventListInput {
  create: BusCreateWithoutEventListInput
  update: BusUpdateWithoutEventListDataInput
  upsert: BusUpsertWithoutEventListInput
  connect: BusWhereUniqueInput
}

input BusUpdateWithoutEventListDataInput {
  startTime: DateTime
  route: RouteUpdateOneRequiredInput
}

input BusUpsertWithoutEventListInput {
  update: BusUpdateWithoutEventListDataInput!
  create: BusCreateWithoutEventListInput!
}

input BusWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  startTime: DateTime
  startTime_not: DateTime
  startTime_in: [DateTime!]
  startTime_not_in: [DateTime!]
  startTime_lt: DateTime
  startTime_lte: DateTime
  startTime_gt: DateTime
  startTime_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  route: RouteWhereInput
  eventList_every: EventWhereInput
  eventList_some: EventWhereInput
  eventList_none: EventWhereInput
  AND: [BusWhereInput!]
  OR: [BusWhereInput!]
  NOT: [BusWhereInput!]
}

input BusWhereUniqueInput {
  id: ID
}

scalar DateTime

type Event {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  stop: Stop!
  bus: Bus!
  time: DateTime!
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  id: ID
  stop: StopCreateOneWithoutEventListInput!
  bus: BusCreateOneWithoutEventListInput!
  time: DateTime!
}

input EventCreateManyWithoutBusInput {
  create: [EventCreateWithoutBusInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateManyWithoutStopInput {
  create: [EventCreateWithoutStopInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateWithoutBusInput {
  id: ID
  stop: StopCreateOneWithoutEventListInput!
  time: DateTime!
}

input EventCreateWithoutStopInput {
  id: ID
  bus: BusCreateOneWithoutEventListInput!
  time: DateTime!
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  time_ASC
  time_DESC
}

type EventPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  time: DateTime!
}

input EventScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  time: DateTime
  time_not: DateTime
  time_in: [DateTime!]
  time_not_in: [DateTime!]
  time_lt: DateTime
  time_lte: DateTime
  time_gt: DateTime
  time_gte: DateTime
  AND: [EventScalarWhereInput!]
  OR: [EventScalarWhereInput!]
  NOT: [EventScalarWhereInput!]
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateInput {
  stop: StopUpdateOneRequiredWithoutEventListInput
  bus: BusUpdateOneRequiredWithoutEventListInput
  time: DateTime
}

input EventUpdateManyDataInput {
  time: DateTime
}

input EventUpdateManyMutationInput {
  time: DateTime
}

input EventUpdateManyWithoutBusInput {
  create: [EventCreateWithoutBusInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  set: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutBusInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutBusInput!]
  deleteMany: [EventScalarWhereInput!]
  updateMany: [EventUpdateManyWithWhereNestedInput!]
}

input EventUpdateManyWithoutStopInput {
  create: [EventCreateWithoutStopInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  set: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutStopInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutStopInput!]
  deleteMany: [EventScalarWhereInput!]
  updateMany: [EventUpdateManyWithWhereNestedInput!]
}

input EventUpdateManyWithWhereNestedInput {
  where: EventScalarWhereInput!
  data: EventUpdateManyDataInput!
}

input EventUpdateWithoutBusDataInput {
  stop: StopUpdateOneRequiredWithoutEventListInput
  time: DateTime
}

input EventUpdateWithoutStopDataInput {
  bus: BusUpdateOneRequiredWithoutEventListInput
  time: DateTime
}

input EventUpdateWithWhereUniqueWithoutBusInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutBusDataInput!
}

input EventUpdateWithWhereUniqueWithoutStopInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutStopDataInput!
}

input EventUpsertWithWhereUniqueWithoutBusInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutBusDataInput!
  create: EventCreateWithoutBusInput!
}

input EventUpsertWithWhereUniqueWithoutStopInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutStopDataInput!
  create: EventCreateWithoutStopInput!
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  stop: StopWhereInput
  bus: BusWhereInput
  time: DateTime
  time_not: DateTime
  time_in: [DateTime!]
  time_not_in: [DateTime!]
  time_lt: DateTime
  time_lte: DateTime
  time_gt: DateTime
  time_gte: DateTime
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createBus(data: BusCreateInput!): Bus!
  updateBus(data: BusUpdateInput!, where: BusWhereUniqueInput!): Bus
  updateManyBuses(data: BusUpdateManyMutationInput!, where: BusWhereInput): BatchPayload!
  upsertBus(where: BusWhereUniqueInput!, create: BusCreateInput!, update: BusUpdateInput!): Bus!
  deleteBus(where: BusWhereUniqueInput!): Bus
  deleteManyBuses(where: BusWhereInput): BatchPayload!
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createRoute(data: RouteCreateInput!): Route!
  updateRoute(data: RouteUpdateInput!, where: RouteWhereUniqueInput!): Route
  updateManyRoutes(data: RouteUpdateManyMutationInput!, where: RouteWhereInput): BatchPayload!
  upsertRoute(where: RouteWhereUniqueInput!, create: RouteCreateInput!, update: RouteUpdateInput!): Route!
  deleteRoute(where: RouteWhereUniqueInput!): Route
  deleteManyRoutes(where: RouteWhereInput): BatchPayload!
  createStop(data: StopCreateInput!): Stop!
  updateStop(data: StopUpdateInput!, where: StopWhereUniqueInput!): Stop
  updateManyStops(data: StopUpdateManyMutationInput!, where: StopWhereInput): BatchPayload!
  upsertStop(where: StopWhereUniqueInput!, create: StopCreateInput!, update: StopUpdateInput!): Stop!
  deleteStop(where: StopWhereUniqueInput!): Stop
  deleteManyStops(where: StopWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  bus(where: BusWhereUniqueInput!): Bus
  buses(where: BusWhereInput, orderBy: BusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Bus]!
  busesConnection(where: BusWhereInput, orderBy: BusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BusConnection!
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  route(where: RouteWhereUniqueInput!): Route
  routes(where: RouteWhereInput, orderBy: RouteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Route]!
  routesConnection(where: RouteWhereInput, orderBy: RouteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RouteConnection!
  stop(where: StopWhereUniqueInput!): Stop
  stops(where: StopWhereInput, orderBy: StopOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Stop]!
  stopsConnection(where: StopWhereInput, orderBy: StopOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StopConnection!
  node(id: ID!): Node
}

type Route {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  stopList(where: StopWhereInput, orderBy: StopOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Stop!]
}

type RouteConnection {
  pageInfo: PageInfo!
  edges: [RouteEdge]!
  aggregate: AggregateRoute!
}

input RouteCreateInput {
  id: ID
  name: String!
  stopList: StopCreateManyInput
}

input RouteCreateOneInput {
  create: RouteCreateInput
  connect: RouteWhereUniqueInput
}

type RouteEdge {
  node: Route!
  cursor: String!
}

enum RouteOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RoutePreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type RouteSubscriptionPayload {
  mutation: MutationType!
  node: Route
  updatedFields: [String!]
  previousValues: RoutePreviousValues
}

input RouteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RouteWhereInput
  AND: [RouteSubscriptionWhereInput!]
  OR: [RouteSubscriptionWhereInput!]
  NOT: [RouteSubscriptionWhereInput!]
}

input RouteUpdateDataInput {
  name: String
  stopList: StopUpdateManyInput
}

input RouteUpdateInput {
  name: String
  stopList: StopUpdateManyInput
}

input RouteUpdateManyMutationInput {
  name: String
}

input RouteUpdateOneRequiredInput {
  create: RouteCreateInput
  update: RouteUpdateDataInput
  upsert: RouteUpsertNestedInput
  connect: RouteWhereUniqueInput
}

input RouteUpsertNestedInput {
  update: RouteUpdateDataInput!
  create: RouteCreateInput!
}

input RouteWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  stopList_every: StopWhereInput
  stopList_some: StopWhereInput
  stopList_none: StopWhereInput
  AND: [RouteWhereInput!]
  OR: [RouteWhereInput!]
  NOT: [RouteWhereInput!]
}

input RouteWhereUniqueInput {
  id: ID
  name: String
}

type Stop {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  eventList(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
}

type StopConnection {
  pageInfo: PageInfo!
  edges: [StopEdge]!
  aggregate: AggregateStop!
}

input StopCreateInput {
  id: ID
  name: String!
  eventList: EventCreateManyWithoutStopInput
}

input StopCreateManyInput {
  create: [StopCreateInput!]
  connect: [StopWhereUniqueInput!]
}

input StopCreateOneWithoutEventListInput {
  create: StopCreateWithoutEventListInput
  connect: StopWhereUniqueInput
}

input StopCreateWithoutEventListInput {
  id: ID
  name: String!
}

type StopEdge {
  node: Stop!
  cursor: String!
}

enum StopOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StopPreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input StopScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [StopScalarWhereInput!]
  OR: [StopScalarWhereInput!]
  NOT: [StopScalarWhereInput!]
}

type StopSubscriptionPayload {
  mutation: MutationType!
  node: Stop
  updatedFields: [String!]
  previousValues: StopPreviousValues
}

input StopSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StopWhereInput
  AND: [StopSubscriptionWhereInput!]
  OR: [StopSubscriptionWhereInput!]
  NOT: [StopSubscriptionWhereInput!]
}

input StopUpdateDataInput {
  name: String
  eventList: EventUpdateManyWithoutStopInput
}

input StopUpdateInput {
  name: String
  eventList: EventUpdateManyWithoutStopInput
}

input StopUpdateManyDataInput {
  name: String
}

input StopUpdateManyInput {
  create: [StopCreateInput!]
  update: [StopUpdateWithWhereUniqueNestedInput!]
  upsert: [StopUpsertWithWhereUniqueNestedInput!]
  delete: [StopWhereUniqueInput!]
  connect: [StopWhereUniqueInput!]
  set: [StopWhereUniqueInput!]
  disconnect: [StopWhereUniqueInput!]
  deleteMany: [StopScalarWhereInput!]
  updateMany: [StopUpdateManyWithWhereNestedInput!]
}

input StopUpdateManyMutationInput {
  name: String
}

input StopUpdateManyWithWhereNestedInput {
  where: StopScalarWhereInput!
  data: StopUpdateManyDataInput!
}

input StopUpdateOneRequiredWithoutEventListInput {
  create: StopCreateWithoutEventListInput
  update: StopUpdateWithoutEventListDataInput
  upsert: StopUpsertWithoutEventListInput
  connect: StopWhereUniqueInput
}

input StopUpdateWithoutEventListDataInput {
  name: String
}

input StopUpdateWithWhereUniqueNestedInput {
  where: StopWhereUniqueInput!
  data: StopUpdateDataInput!
}

input StopUpsertWithoutEventListInput {
  update: StopUpdateWithoutEventListDataInput!
  create: StopCreateWithoutEventListInput!
}

input StopUpsertWithWhereUniqueNestedInput {
  where: StopWhereUniqueInput!
  update: StopUpdateDataInput!
  create: StopCreateInput!
}

input StopWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  eventList_every: EventWhereInput
  eventList_some: EventWhereInput
  eventList_none: EventWhereInput
  AND: [StopWhereInput!]
  OR: [StopWhereInput!]
  NOT: [StopWhereInput!]
}

input StopWhereUniqueInput {
  id: ID
  name: String
}

type Subscription {
  bus(where: BusSubscriptionWhereInput): BusSubscriptionPayload
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  route(where: RouteSubscriptionWhereInput): RouteSubscriptionPayload
  stop(where: StopSubscriptionWhereInput): StopSubscriptionPayload
}
`
      }
    