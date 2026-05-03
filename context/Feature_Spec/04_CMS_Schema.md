Read [AGENT.md](../../AGENT.md) before starting

# Feature Spec: 04 CMS Schema

## 1. Overview
The Godwin Udu Motion Design Portfolio utilizes Webflow CMS to manage case studies. The schema is optimized for narrative journeys and strategic media delivery, ensuring lightweight initial paints.

## 2. Collection: Case Studies

| Field Name | Field Type | Requirement | Description/Purpose |
|------------|------------|-------------|---------------------|
| **Project Name** | Plain Text | Required | Brutalist title displayed on index and detail page. |
| **Slug** | Slug | Required | URL-friendly name. |
| **Client / Brand** | Plain Text | Optional | Brand associated with the work. |
| **Thumbnail Image** | Image | Required | Strictly WebP optimized, high contrast poster image. |
| **Index Reel Fragment** | Video Link | Optional | 3-5 second muted, compressed loop for hover states on index. |
| **Primary Video (Raw)** | Plain Text | Required | Direct CDN link (Cloudinary/Mux) for uncompressed, white-labeled case study playback. |
| **Role & Services** | Multi-Reference | Required | Maps to a 'Services' collection (e.g. 3D Animation, Kinetic Typography). |
| **Year** | Number | Required | Year of execution for chronological sorting. |
| **Narrative Overview** | Rich Text | Required | The narrative text used to pre-qualify the viewer before showing raw video grids. |
| **Grid Assets** | Multi-Image | Optional | Stills and style-frames defining the visual direction. |
| **Featured** | Switch | Required | Boolean to pin project to Hero or 'Selected Works' area. |

## 3. Collection: Services

| Field Name | Field Type | Requirement | Description/Purpose |
|------------|------------|-------------|---------------------|
| **Service Name** | Plain Text | Required | e.g. "Creative Direction", "3D Motion". |

## 4. Performance Directives
- Editor upload privileges must enforce WebP standard usage for `Thumbnail Image` and `Grid Assets`.
- `Primary Video (Raw)` must NOT be a standard YouTube/Vimeo embed to prevent 3rd party scripts. It must be a raw `.mp4`/`.webm` or HLS stream link consumed by a custom lightweight player utilizing the `Click-to-Load Mechanics`.
