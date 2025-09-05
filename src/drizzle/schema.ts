import {
  pgTable,
  timestamp,
  text,
  integer,
  boolean,
  jsonb,
  uniqueIndex,
  foreignKey,
  bigint,
  index,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const incompleteFileStatus = pgEnum('IncompleteFileStatus', [
  'PENDING',
  'PROCESSING',
  'COMPLETE',
  'FAILED',
]);
export const oauthProviderType = pgEnum('OAuthProviderType', ['DISCORD', 'GOOGLE', 'GITHUB', 'OIDC']);
export const role = pgEnum('Role', ['USER', 'ADMIN', 'SUPERADMIN']);
export const userFilesQuota = pgEnum('UserFilesQuota', ['BY_BYTES', 'BY_FILES']);

export const zipline = pgTable('Zipline', {
  id: text().primaryKey().notNull(),
  createdAt: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  firstSetup: boolean().default(true).notNull(),
  coreReturnHttpsUrls: boolean().default(false).notNull(),
  coreDefaultDomain: text(),
  coreTempDirectory: text().notNull(),
  chunksEnabled: boolean().default(true).notNull(),
  chunksMax: text().default('95mb').notNull(),
  chunksSize: text().default('25mb').notNull(),
  tasksDeleteInterval: text().default('30m').notNull(),
  tasksClearInvitesInterval: text().default('30m').notNull(),
  tasksMaxViewsInterval: text().default('30m').notNull(),
  tasksThumbnailsInterval: text().default('30m').notNull(),
  tasksMetricsInterval: text().default('30m').notNull(),
  filesRoute: text().default('/u').notNull(),
  filesLength: integer().default(6).notNull(),
  filesDefaultFormat: text().default('random').notNull(),
  filesDisabledExtensions: text().array(),
  filesMaxFileSize: text().default('100mb').notNull(),
  filesDefaultExpiration: text(),
  filesAssumeMimetypes: boolean().default(false).notNull(),
  filesDefaultDateFormat: text().default('YYYY-MM-DD_HH:mm:ss').notNull(),
  filesRemoveGpsMetadata: boolean().default(false).notNull(),
  urlsRoute: text().default('/go').notNull(),
  urlsLength: integer().default(6).notNull(),
  featuresImageCompression: boolean().default(true).notNull(),
  featuresRobotsTxt: boolean().default(true).notNull(),
  featuresHealthcheck: boolean().default(true).notNull(),
  featuresUserRegistration: boolean().default(false).notNull(),
  featuresOauthRegistration: boolean().default(false).notNull(),
  featuresDeleteOnMaxViews: boolean().default(true).notNull(),
  featuresThumbnailsEnabled: boolean().default(true).notNull(),
  featuresThumbnailsNumberThreads: integer().default(4).notNull(),
  featuresMetricsEnabled: boolean().default(true).notNull(),
  featuresMetricsAdminOnly: boolean().default(false).notNull(),
  featuresMetricsShowUserSpecific: boolean().default(true).notNull(),
  invitesEnabled: boolean().default(true).notNull(),
  invitesLength: integer().default(6).notNull(),
  websiteTitle: text().default('Zipline').notNull(),
  websiteTitleLogo: text(),
  websiteExternalLinks: jsonb()
    .default([
      { url: 'https://github.com/diced/zipline', name: 'GitHub' },
      { url: 'https://zipline.diced.sh/', name: 'Documentation' },
    ])
    .notNull(),
  websiteLoginBackground: text(),
  websiteDefaultAvatar: text(),
  websiteTos: text(),
  websiteThemeDefault: text().default('system').notNull(),
  websiteThemeDark: text().default('builtin:dark_gray').notNull(),
  websiteThemeLight: text().default('builtin:light_gray').notNull(),
  oauthBypassLocalLogin: boolean().default(false).notNull(),
  oauthLoginOnly: boolean().default(false).notNull(),
  oauthDiscordClientId: text(),
  oauthDiscordClientSecret: text(),
  oauthDiscordRedirectUri: text(),
  oauthGoogleClientId: text(),
  oauthGoogleClientSecret: text(),
  oauthGoogleRedirectUri: text(),
  oauthGithubClientId: text(),
  oauthGithubClientSecret: text(),
  oauthGithubRedirectUri: text(),
  oauthOidcClientId: text(),
  oauthOidcClientSecret: text(),
  oauthOidcAuthorizeUrl: text(),
  oauthOidcTokenUrl: text(),
  oauthOidcUserinfoUrl: text(),
  oauthOidcRedirectUri: text(),
  mfaTotpEnabled: boolean().default(false).notNull(),
  mfaTotpIssuer: text().default('Zipline').notNull(),
  mfaPasskeys: boolean().default(false).notNull(),
  ratelimitEnabled: boolean().default(true).notNull(),
  ratelimitMax: integer().default(10).notNull(),
  ratelimitWindow: integer(),
  ratelimitAdminBypass: boolean().default(true).notNull(),
  ratelimitAllowList: text().array(),
  httpWebhookOnUpload: text(),
  httpWebhookOnShorten: text(),
  discordWebhookUrl: text(),
  discordUsername: text(),
  discordAvatarUrl: text(),
  discordOnUploadWebhookUrl: text(),
  discordOnUploadUsername: text(),
  discordOnUploadAvatarUrl: text(),
  discordOnUploadContent: text(),
  discordOnUploadEmbed: jsonb(),
  discordOnShortenWebhookUrl: text(),
  discordOnShortenUsername: text(),
  discordOnShortenAvatarUrl: text(),
  discordOnShortenContent: text(),
  discordOnShortenEmbed: jsonb(),
  pwaEnabled: boolean().default(false).notNull(),
  pwaTitle: text().default('Zipline').notNull(),
  pwaShortName: text().default('Zipline').notNull(),
  pwaDescription: text().default('Zipline').notNull(),
  pwaThemeColor: text().default('#000000').notNull(),
  pwaBackgroundColor: text().default('#000000').notNull(),
  websiteLoginBackgroundBlur: boolean().default(true).notNull(),
  filesRandomWordsNumAdjectives: integer().default(2).notNull(),
  filesRandomWordsSeparator: text().default('-').notNull(),
  featuresVersionAPI: text().default('https://zipline-version.diced.sh').notNull(),
  featuresVersionChecking: boolean().default(true).notNull(),
  oauthDiscordAllowedIds: text().array().default(['RAY']),
  oauthDiscordDeniedIds: text().array().default(['RAY']),
  domains: text().array().default(['RAY']),
  filesDefaultCompressionFormat: text().default('jpg'),
  featuresThumbnailsFormat: text().default('jpg').notNull(),
});

export const metric = pgTable('Metric', {
  id: text().primaryKey().notNull(),
  createdAt: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  data: jsonb().notNull(),
});

export const url = pgTable(
  'Url',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    code: text().notNull(),
    vanity: text(),
    destination: text().notNull(),
    views: integer().default(0).notNull(),
    maxViews: integer(),
    password: text(),
    userId: text(),
    enabled: boolean().default(true).notNull(),
  },
  (table) => [
    uniqueIndex('Url_code_vanity_key').using(
      'btree',
      table.code.asc().nullsLast().op('text_ops'),
      table.vanity.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'Url_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const folder = pgTable(
  'Folder',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    name: text().notNull(),
    public: boolean().default(false).notNull(),
    userId: text().notNull(),
    allowUploads: boolean().default(false).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'Folder_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const user = pgTable(
  'User',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    username: text().notNull(),
    password: text(),
    avatar: text(),
    token: text().notNull(),
    role: role().default('USER').notNull(),
    view: jsonb().default({}).notNull(),
    totpSecret: text(),
    sessions: text().array(),
  },
  (table) => [
    uniqueIndex('User_token_key').using('btree', table.token.asc().nullsLast().op('text_ops')),
    uniqueIndex('User_username_key').using('btree', table.username.asc().nullsLast().op('text_ops')),
  ],
);

export const exportTable = pgTable(
  'Export',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    completed: boolean().default(false).notNull(),
    path: text().notNull(),
    files: integer().notNull(),
    size: text().notNull(),
    userId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'Export_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const userQuota = pgTable(
  'UserQuota',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    filesQuota: userFilesQuota().notNull(),
    maxBytes: text(),
    maxFiles: integer(),
    maxUrls: integer(),
    userId: text(),
  },
  (table) => [
    uniqueIndex('UserQuota_userId_key').using('btree', table.userId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'UserQuota_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const userPasskey = pgTable(
  'UserPasskey',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    lastUsed: timestamp({ precision: 3, mode: 'string' }),
    name: text().notNull(),
    reg: jsonb().notNull(),
    userId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'UserPasskey_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const oauthProvider = pgTable(
  'OAuthProvider',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    userId: text().notNull(),
    provider: oauthProviderType().notNull(),
    username: text().notNull(),
    accessToken: text().notNull(),
    refreshToken: text(),
    oauthId: text(),
  },
  (table) => [
    uniqueIndex('OAuthProvider_provider_oauthId_key').using(
      'btree',
      table.provider.asc().nullsLast().op('text_ops'),
      table.oauthId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'OAuthProvider_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const file = pgTable(
  'File',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    deletesAt: timestamp({ precision: 3, mode: 'string' }),
    name: text().notNull(),
    originalName: text(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    size: bigint({ mode: 'number' }).notNull(),
    type: text().notNull(),
    views: integer().default(0).notNull(),
    maxViews: integer(),
    favorite: boolean().default(false).notNull(),
    password: text(),
    userId: text(),
    folderId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'File_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
    foreignKey({
      columns: [table.folderId],
      foreignColumns: [folder.id],
      name: 'File_folderId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const thumbnail = pgTable(
  'Thumbnail',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    path: text().notNull(),
    fileId: text().notNull(),
  },
  (table) => [
    uniqueIndex('Thumbnail_fileId_key').using('btree', table.fileId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.fileId],
      foreignColumns: [file.id],
      name: 'Thumbnail_fileId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const incompleteFile = pgTable(
  'IncompleteFile',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    status: incompleteFileStatus().notNull(),
    chunksTotal: integer().notNull(),
    chunksComplete: integer().notNull(),
    metadata: jsonb().notNull(),
    userId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'IncompleteFile_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const tag = pgTable(
  'Tag',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    name: text().notNull(),
    color: text().notNull(),
    userId: text(),
  },
  (table) => [
    uniqueIndex('Tag_name_key').using('btree', table.name.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'Tag_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const invite = pgTable(
  'Invite',
  {
    id: text().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    expiresAt: timestamp({ precision: 3, mode: 'string' }),
    code: text().notNull(),
    uses: integer().default(0).notNull(),
    maxUses: integer(),
    inviterId: text().notNull(),
  },
  (table) => [
    uniqueIndex('Invite_code_key').using('btree', table.code.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.inviterId],
      foreignColumns: [user.id],
      name: 'Invite_inviterId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const fileToTag = pgTable(
  '_FileToTag',
  {
    a: text('A').notNull(),
    b: text('B').notNull(),
  },
  (table) => [
    index().using('btree', table.b.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.a],
      foreignColumns: [file.id],
      name: '_FileToTag_A_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.b],
      foreignColumns: [tag.id],
      name: '_FileToTag_B_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    primaryKey({ columns: [table.a, table.b], name: '_FileToTag_AB_pkey' }),
  ],
);
