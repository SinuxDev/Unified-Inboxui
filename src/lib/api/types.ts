export type OrgRole = 'owner' | 'admin' | 'member';

export type AuthSessionPayload = {
  user: {
    id: string;
    email: string;
    displayName: string | null;
  };
  organization: {
    id: string;
    name: string;
    role: OrgRole;
  };
};

export type NestAuthResponse = AuthSessionPayload & {
  accessToken: string;
  refreshToken: string;
};

export type OrganizationMe = {
  organizationId: string;
  organizationName: string;
  role: OrgRole;
  userId: string;
  email: string;
};

export type Team = {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
};
