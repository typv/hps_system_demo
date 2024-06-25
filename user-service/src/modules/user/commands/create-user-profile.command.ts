export class CreateUserProfileCommand {
  constructor(
    public readonly id: number,
    public readonly avatar: string,
  ) {}
}