import util from "node:util";
import { execFile as rawExecFile } from "node:child_process";
import fs from "fs";
import path from "path";
import { type IconSetGitSource } from "./_types";
import { icons } from "../src/icons";
import PQueue from "p-queue";
const execFile = util.promisify(rawExecFile);

interface Context {
  distBaseDir: string;
  iconDir(name: string): string;
}

const sucessRepo = path.resolve(__dirname, '../successRepo.txt')
const failedRepo = path.resolve(__dirname, '../faildedRepo.txt')
fs.appendFileSync(sucessRepo, '')
fs.appendFileSync(failedRepo, '')

async function main() {
  const distBaseDir = path.join(__dirname, "../icons");
  console.log(distBaseDir)
  const ctx: Context = {
    distBaseDir,
    iconDir(name: string) {
      return path.join(distBaseDir, name);
    },
  };

  // rm all icons and mkdir dist
  /*await fs.promises.rm(distBaseDir, {
    recursive: true,
    force: true,
  });
  await fs.promises.mkdir(distBaseDir, {
    recursive: true,
  });*/

  const queue = new PQueue({ concurrency: 10 });
  const sucessString = fs.readFileSync(sucessRepo).toString()
  const sucesses = sucessString.split('\n')
  const length = Object.keys(icons).length
  let _index = 0
  for (const icon of icons) {
    if (sucesses.includes(icon.source?.localName || '')) {
      console.log(`第${_index}个已经下载成功,跳过,总个数${length}`);
      _index++
      continue
    }
    if (!icon.source) {
      console.log(`第${_index}个没有信息,跳过,总个数${length}`);
      _index
      continue;
    }
    const { source } = icon;
    source.index = _index
    source.totalRepo = length
    _index++
    queue.add(() => gitCloneIcon(source, ctx));
  }

  await queue.onIdle();
}

async function gitCloneIcon(source: IconSetGitSource, ctx: Context) {
  console.log(
    `start ${source.index} clone icon: ${source.url}/${source.remoteDir}@${source.branch}`
  );
  await execFile(
    "git",
    ["clone", "--filter=tree:0", "--no-checkout", source.url, source.localName],
    {
      cwd: ctx.distBaseDir,
    }
  ).catch((e) => {
    console.log(`git clone faild ${source.index}个，${source.localName}\n\n${e}`)
    throw new Error(JSON.stringify({ source, ctx }));
  });

  await execFile(
    "git",
    ["sparse-checkout", "set", "--cone", "--skip-checks", source.remoteDir],
    {
      cwd: ctx.iconDir(source.localName),
    }
  ).catch((e) => {
    console.log(`git checkout faild ${source.index}个，${source.localName}\n\n${e}`)

    throw { source, ctx };
  });;

  await execFile("git", ["checkout", source.hash], {
    cwd: ctx.iconDir(source.localName),
  }).catch((e) => {
    console.log(`git checkout hash faild ${source.index}个，${source.localName}\n${source.hash}\n\n${e}`)
    throw { source, ctx };
  });;
  console.log(`第${source.index}个已经成功，总个数${source.totalRepo}`)
  fs.appendFileSync(sucessRepo, `${source.localName}
`)
}

main().catch((err) => {
  console.error(err);
  fs.appendFileSync(failedRepo, `${err.source.localName}
`)
  // process.exit(1);
});
