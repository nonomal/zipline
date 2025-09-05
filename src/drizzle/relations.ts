import { relations } from 'drizzle-orm/relations';
import {
  user,
  url,
  folder,
  exportTable,
  userQuota,
  userPasskey,
  oauthProvider,
  file,
  thumbnail,
  incompleteFile,
  tag,
  invite,
  fileToTag,
} from './schema';

export const urlRelations = relations(url, ({ one }) => ({
  user: one(user, {
    fields: [url.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  urls: many(url),
  folders: many(folder),
  exports: many(exportTable),
  userQuotas: many(userQuota),
  userPasskeys: many(userPasskey),
  oauthProviders: many(oauthProvider),
  files: many(file),
  incompleteFiles: many(incompleteFile),
  tags: many(tag),
  invites: many(invite),
}));

export const folderRelations = relations(folder, ({ one, many }) => ({
  user: one(user, {
    fields: [folder.userId],
    references: [user.id],
  }),
  files: many(file),
}));

export const exportRelations = relations(exportTable, ({ one }) => ({
  user: one(user, {
    fields: [exportTable.userId],
    references: [user.id],
  }),
}));

export const userQuotaRelations = relations(userQuota, ({ one }) => ({
  user: one(user, {
    fields: [userQuota.userId],
    references: [user.id],
  }),
}));

export const userPasskeyRelations = relations(userPasskey, ({ one }) => ({
  user: one(user, {
    fields: [userPasskey.userId],
    references: [user.id],
  }),
}));

export const oauthProviderRelations = relations(oauthProvider, ({ one }) => ({
  user: one(user, {
    fields: [oauthProvider.userId],
    references: [user.id],
  }),
}));

export const fileRelations = relations(file, ({ one, many }) => ({
  user: one(user, {
    fields: [file.userId],
    references: [user.id],
  }),
  folder: one(folder, {
    fields: [file.folderId],
    references: [folder.id],
  }),
  thumbnails: many(thumbnail),
  fileToTags: many(fileToTag),
}));

export const thumbnailRelations = relations(thumbnail, ({ one }) => ({
  file: one(file, {
    fields: [thumbnail.fileId],
    references: [file.id],
  }),
}));

export const incompleteFileRelations = relations(incompleteFile, ({ one }) => ({
  user: one(user, {
    fields: [incompleteFile.userId],
    references: [user.id],
  }),
}));

export const tagRelations = relations(tag, ({ one, many }) => ({
  user: one(user, {
    fields: [tag.userId],
    references: [user.id],
  }),
  fileToTags: many(fileToTag),
}));

export const inviteRelations = relations(invite, ({ one }) => ({
  user: one(user, {
    fields: [invite.inviterId],
    references: [user.id],
  }),
}));

export const fileToTagRelations = relations(fileToTag, ({ one }) => ({
  file: one(file, {
    fields: [fileToTag.a],
    references: [file.id],
  }),
  tag: one(tag, {
    fields: [fileToTag.b],
    references: [tag.id],
  }),
}));
