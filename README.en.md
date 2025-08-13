<!--
 * @Author: wrainCN 123723620@qq.com
 * @Date: 2025-08-10 23:00:04
 * @LastEditors: wrainCN 123723620@qq.com
 * @LastEditTime: 2025-08-13 14:48:44
 * @FilePath: \element-advanced-search\README.en.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Changelog

All notable changes to the Element Advanced Search component will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/lang/en/) specification.

## [Unreleased]

### Added
- Added Teleport feature to display search tags at any position on the page
- Added [teleportTo](file://e:\web\element-advanced-search\src\components\ElementAdvancedSearch\index.vue#L14-L14) property to specify the target position for tag teleportation

### Changed

### Fixed

### Deprecated

## [1.0.5] - 2025-08-12

### Added
- Added Time and Time Range form type support
- Support for passing specific properties to different component types via elProps attribute

### Changed
- Optimized the tag display logic for number ranges and date ranges
- Improved the remote option loading process
- Enhanced Chinese and English documentation with detailed configuration instructions

### Fixed
- Fixed bug in number input value processing
- Fixed initialization issue with date range picker
- Fixed some edge cases in cache functionality
- Fixed some issues with textarea auto-expansion feature

## [1.0.4] - 2025-08-11

### Added
- Added Textarea form type support with auto-expansion feature
- Added Number Range form type support
- Added support for Element Plus icon library dependency

### Changed
- Enhanced Chinese and English documentation with detailed configuration instructions
- Optimized number input processing logic
- Improved tag display logic for date ranges and number ranges
- Optimized remote option loading process

### Fixed
- Fixed bug in number input value processing
- Fixed initialization issue with date range picker
- Fixed some edge cases in cache functionality

## [1.0.0] - 2025-08-09

### Added
- Initial version release
- Support for basic search and advanced filtering features
- Support for multiple form control types (input boxes, select boxes, radio buttons, checkboxes, date pickers, etc.)
- Support for search condition caching functionality
- Support for custom slots and tag display
- Provided complete TypeScript type support