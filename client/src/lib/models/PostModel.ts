import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type PostModelType = z.infer<typeof PostModel.schema>;

export class PostModel {
  static readonly schema = z.object({
    _id: z.string()
      .optional(),
    title: z.string()
      .min(1, 'Required Field'),
    message: z.string()
      .min(1, 'Required Field'),
    creator: z.string()
      .min(1, 'Required Field'),
    tags: z.array(z.string()),
    selectedFile: z.string()
      .min(1, 'Required Field'),
    likeCount: z.number().default(0),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  });

  static readonly resolver = {
    resolver: zodResolver(this.schema),
  }
}