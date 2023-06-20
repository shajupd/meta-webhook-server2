import Lead, { LeadDocument } from "../models/lead.model";


async function createLead(leadData: LeadDocument): Promise<LeadDocument> {
  return Lead.create(leadData);
}

async function getLeads(): Promise<LeadDocument[]> {
  return Lead.find();
}

const leadRepository = {
  createLead,
  getLeads,
};

export default leadRepository;
