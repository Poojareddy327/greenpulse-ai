# 🎨 3D & Visual Effects - GreenPulse AI

## Added 3D/2D Visual Enhancements ✅

### 1. 🎴 **CSS3DCard Component**
Advanced 3D card with mouse tracking and perspective effects.

**Features:**
- Mouse-follow 3D rotation
- Smooth spring animations
- Depth layering with translateZ
- Glow effects on hover
- Used throughout the app for enhanced cards

**Usage:**
```jsx
<CSS3DCard>
  <div className="glass-card p-6">
    Your content here
  </div>
</CSS3DCard>
```

---

### 2. ✨ **Particle Background**
Animated particle system with connecting lines.

**Features:**
- 50 floating particles
- Dynamic connections between nearby particles
- Multiple green shades (#22C55E, #14B8A6, #10B981)
- Responsive to window resize
- Subtle movement for atmosphere
- Canvas-based for performance

**Where Used:**
- Calculator page background
- Can be added to any page

**Technical:**
- Pure Canvas API
- 60 FPS animation
- Distance-based line opacity
- Automatic cleanup

---

### 3. 📊 **AnimatedStats Component**
3D statistics cards with flip animations.

**Features:**
- 4 stat cards with individual 3D transforms
- Staggered entrance animations
- Hover effects (scale + rotate)
- Depth shadows
- Color-coded metrics:
  - 🔴 Carbon (Red)
  - 🔵 Water (Blue)
  - 🟢 Trees (Green)
  - 🟡 Energy (Yellow)

**Props:**
```jsx
<AnimatedStats
  carbon={180}      // kg CO₂
  water={2800}      // Liters
  trees={40}        // Trees needed
  energy={300}      // kWh
/>
```

---

### 4. 🌲 **TreeCounter3D** (React Three Fiber)
3D forest visualization showing trees needed for offset.

**Features:**
- Realistic 3D trees with trunk and leaves
- Multiple tree layers with different colors
- Gentle swaying animation
- Ground plane with grass texture
- Dynamic lighting (ambient, directional, hemisphere)
- Displays up to 12 trees for performance

**Technical:**
- React Three Fiber & Drei
- Three.js geometries (Cone, Cylinder)
- Standard materials with roughness/metalness
- Auto-rotating animation

---

### 5. 🧬 **CarbonVisualization** (React Three Fiber)
3D CO₂ molecule with orbiting particles.

**Features:**
- Accurate CO₂ molecule structure
  - 1 Carbon atom (black, center)
  - 2 Oxygen atoms (red, sides)
  - Connecting bonds (gray cylinders)
- Orbiting particles representing emissions
- Auto-rotate with orbit controls
- Dynamic particle count based on carbon amount
- Color-coded particle system
- Interactive controls (drag to rotate)

**Props:**
```jsx
<CarbonVisualization carbonAmount={180} />
```

---

### 6. 🌍 **EarthAnimation** (React Three Fiber)
Rotating Earth with atmosphere and star field.

**Features:**
- 3D Earth sphere with blue oceans
- Green landmass overlay
- Atmospheric glow layer
- 5000+ animated stars background
- Auto-rotation
- Directional and point lighting
- Orbit controls enabled

**Where to Use:**
- Home page hero section
- Educational pages
- About section

---

### 7. 🌐 **Globe3D** (React Three Fiber)
Distorted sphere with morphing animation.

**Features:**
- MeshDistortMaterial for organic look
- Continuous morph animation
- Metallic green material
- Smooth rotation
- Modern, abstract aesthetic

---

### 8. 🎯 **Enhanced Calculator Results**
Circular progress indicator with gradient stroke.

**Features:**
- SVG-based circular progress
- Animated path drawing (pathLength)
- Linear gradient coloring
- Large centered score
- Smooth spring animations
- Staggered recommendation cards

---

## Visual Effects Library

### Framer Motion Animations
```jsx
// Entrance animations
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// 3D rotation on hover
whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}

// Spring physics
transition={{ type: 'spring', stiffness: 300 }}
```

### CSS 3D Transforms
```css
.perspective-1000 {
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Depth layering */
transform: translateZ(20px);
transform: translateZ(-10px);
```

### Particle System
- Canvas 2D API
- Physics-based movement
- Proximity-based connections
- Opacity fade with distance

---

## Performance Optimizations

### Three.js
- Limited particle counts
- LOD (Level of Detail) for trees
- Efficient geometry reuse
- RequestAnimationFrame loops

### Canvas
- Clear rect instead of full redraw
- Optimized collision detection
- Window resize debouncing

### React
- UseRef for animations
- UseEffect cleanup
- Memoization where needed

---

## Browser Compatibility

### CSS 3D
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (fallback to 2D)

### Canvas
- ✅ All modern browsers
- ✅ Mobile browsers

### WebGL (Three.js)
- ✅ Chrome/Edge/Firefox
- ✅ Safari 15+
- ⚠️ Mobile (reduced particle count)

---

## Installation

### Already Installed (CSS-based)
- ✅ Framer Motion
- ✅ CSS3DCard
- ✅ ParticleBackground
- ✅ AnimatedStats

### To Install (Three.js components)
```bash
npm install --legacy-peer-deps three @react-three/fiber @react-three/drei
```

Then use:
- TreeCounter3D
- CarbonVisualization
- EarthAnimation
- Globe3D

---

## Usage Examples

### Calculator Page
```jsx
import ParticleBackground from '../components/ParticleBackground'
import AnimatedStats from '../components/AnimatedStats'
import CSS3DCard from '../components/CSS3DCard'

<div className="relative">
  <ParticleBackground />
  <AnimatedStats carbon={180} water={2800} trees={40} energy={300} />
  <CSS3DCard>
    <div className="glass-card p-6">
      Results here
    </div>
  </CSS3DCard>
</div>
```

### Home Page (with Three.js)
```jsx
import EarthAnimation from '../components/EarthAnimation'

<section>
  <EarthAnimation />
</section>
```

### Comparison Page
```jsx
import Globe3D from '../components/Globe3D'

<Globe3D />
```

---

## Color Scheme for 3D

### Primary Effects
- Green: `#22C55E`
- Teal: `#14B8A6`
- Emerald: `#10B981`

### Particle Colors
- `#22C55E` (40%)
- `#14B8A6` (30%)
- `#10B981` (30%)

### Lighting
- Ambient: White 0.5 intensity
- Directional: White 1.0 intensity
- Point lights: Green/Teal accent

---

## Future 3D Enhancements

### Phase 2
- [ ] AR mode for carbon visualization
- [ ] VR tour of offset projects
- [ ] Animated carbon reduction timeline
- [ ] 3D city carbon footprint maps

### Phase 3
- [ ] Real-time 3D Earth with data overlay
- [ ] Interactive molecule builder
- [ ] Physics-based tree planting game
- [ ] Holographic UI elements

---

## Performance Metrics

### FPS Targets
- Desktop: 60 FPS
- Mobile: 30 FPS
- Three.js scenes: 30-60 FPS

### Bundle Size
- CSS3DCard: ~2KB
- ParticleBackground: ~3KB
- AnimatedStats: ~4KB
- Three.js components: ~200KB (lazy loaded)

---

**3D features successfully added to enhance carbon footprint awareness!** 🎨✨
