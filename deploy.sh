yarn build

cp ./dist/* ../viteAdminDist/
cd ../viteAdminDist/
pwd
git add -A
git commit -m 'deploy'
git push giteeOrigin master
rm -rf ./*