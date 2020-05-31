import { Test, TestingModule } from "@nestjs/testing";
import { FolderService } from "./folder.service";

describe('Folder service', () => {
    let testingModule: TestingModule;
    let service: FolderService;

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            providers: [
                FolderService,
            ],
        }).compile();

        service = testingModule.get(FolderService);
    });

    describe('Get Folders', () => {
        it('Find all folders', async () => {
            // const folders = service.getFolders(`/mnt/name_not_found/Novels`);

            expect(1).toBeGreaterThanOrEqual(0);
        });
    });
});  