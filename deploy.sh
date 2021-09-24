yarn build

cp ./dist/* ../viteAdminDist/
cd ../viteAdminDist/
pwd
git status
git add -A
git commit -m 'deploy'
git push giteeOrigin master
rm -rf ./*