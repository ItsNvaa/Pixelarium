import * as path from "path";
import { PrismaProvider } from "@/libs/providers/prisma/prisma.provider";
import { HttpStatus, Injectable } from "@nestjs/common";
import { DeleteUserResponseDto } from "../dtos/delete-user.dto";
import { FileSystemProvider } from "@/libs/providers/file-system/file-system.provider";
import { RetrieveUserService } from "./retrieve-user.service";
import { RetrieveUserResponseDto } from "../dtos/retrieve-user.dto";
import { StaticDirectoryProvider } from "@/common/providers/static-directoty/static-directory.provider";

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly prisma: PrismaProvider,
    private readonly fileSystem: FileSystemProvider,
    private readonly retrieveUserService: RetrieveUserService,
    private readonly staticDirectory: StaticDirectoryProvider
  ) {}

  public async deleteSingleUser(name: string): Promise<void> {
    await this.prisma.user.delete({ where: { name } });
  }

  public async deleteUser(name: string): Promise<DeleteUserResponseDto> {
    const { user }: Awaited<RetrieveUserResponseDto> =
      await this.retrieveUserService.retrieveSingleUser(name);

    const filename: string = path.basename(user.avatar);
    const dirpath: string =
      this.staticDirectory.getUserAvatarDirectory(filename);

    this.fileSystem.deleteFile(dirpath);

    await this.deleteSingleUser(name);

    return {
      deleted_user: user,
      code: HttpStatus.OK,
      status: "OK",
    };
  }
}
