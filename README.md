# マストプロジェクト

## プロジェクト概要
シンプルな静的ウェブサイトのテストプロジェクトです。Azure DevOps で管理・デプロイされています。

## デプロイURL
[プロジェクトサイト](https://witty-desert-085c36410.4.azurestaticapps.net)

## 技術スタック
- HTML5
- Azure Static Web Apps
- Azure DevOps

## 内容物
- `index.html`: メインページ
- `README.md`: プロジェクト説明
- `azure-pipelines.yml`: Azure DevOps パイプライン設定

## デプロイ状況
[![Build Status](https://dev.azure.com/ntysbzgx/test/_apis/build/status/test?branchName=dev)](https://dev.azure.com/ntysbzgx/test/_build/latest?definitionId=1&branchName=dev)

## 開発手順
1. リポジトリのクローン:
```bash
git clone https://ntysbzgx@dev.azure.com/ntysbzgx/test/_git/test
```

2. ローカルでの開発:
- `index.html` を編集
- ブラウザで確認

3. デプロイ:
```bash
git add .
git commit -m "変更内容"
git push origin dev
```

## メモ
- devブランチへのプッシュで自動デプロイされます
- Azure Static Web Apps でホスティング: witty-desert-085c36410.4.azurestaticapps.net