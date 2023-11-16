import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export type GoogleInfoModelType = z.infer<typeof GoogleInfoModel.schema>;

export class GoogleInfoModel {
  static readonly schema = z.object({
    id: z.string(),
    email: z.string()
      .email('Invalid email'),
    name: z.string(),
    family_name: z.string(),
    given_name: z.string(),
    picture: z.string(),
  });

  static readonly resolver = {
    resolver: zodResolver(this.schema),
  }
}