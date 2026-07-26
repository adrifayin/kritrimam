"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import { Field } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-ink-line py-10">
      <Eyebrow rule>{title}</Eyebrow>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  );
}

export default function KitchenSink() {
  const [open, setOpen] = useState(false);

  return (
    <main id="main" className="container-content py-20">
      <h1 className="font-display text-h2 text-bone">Kitchen sink</h1>
      <p className="mt-3 text-body text-text-muted">
        Primitive review surface — not shipped to the marketing site.
      </p>

      <Row title="Button · primary">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
        <Button href="#top">As link</Button>
      </Row>

      <Row title="Button · secondary">
        <Button variant="secondary" size="sm">Small</Button>
        <Button variant="secondary" size="md">Medium</Button>
        <Button variant="secondary" size="lg">Large</Button>
      </Row>

      <Row title="Button · ghost">
        <Button variant="ghost" size="sm">Small</Button>
        <Button variant="ghost" size="md">Medium</Button>
        <Button variant="ghost" size="lg">Large</Button>
      </Row>

      <Row title="Eyebrow">
        <Eyebrow tone="brass">Brass eyebrow</Eyebrow>
        <Eyebrow tone="muted" rule>With leading rule</Eyebrow>
        <Eyebrow tone="bone">Bone</Eyebrow>
      </Row>

      <Row title="Divider">
        <div className="w-full">
          <Divider />
        </div>
      </Row>

      <Row title="Field">
        <div className="grid w-full max-w-xl gap-6">
          <Field label="Email" type="email" placeholder="your@email.com" />
          <Field
            label="Email (error)"
            type="email"
            defaultValue="nope"
            error="That doesn't look like an email address — mind checking it?"
          />
          <Field
            label="What are you trying to solve?"
            multiline
            hint="Up to 500 characters."
            placeholder="Tell us about the bottleneck…"
          />
        </div>
      </Row>

      <Row title="Modal">
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} labelledBy="ks-modal-title">
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <h2 id="ks-modal-title" className="font-display text-h3 text-bone">
              A dialog
            </h2>
            <p className="text-body text-text-muted">
              Escape closes it, focus is trapped inside, and it returns focus to
              the trigger on close. Mobile renders it as a bottom sheet.
            </p>
            <Field label="Name" placeholder="Ada Lovelace" />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </div>
          </div>
        </Modal>
      </Row>

      <Row title="Reveal (scroll)">
        <Reveal className="text-body text-text-muted">
          This line fades and rises on scroll into view.
        </Reveal>
      </Row>

      <Row title="Stagger (scroll)">
        <Stagger as="ul" className="grid w-full gap-3 sm:grid-cols-3">
          {["One", "Two", "Three"].map((n) => (
            <StaggerItem
              as="li"
              key={n}
              className="rounded-md border border-ink-line bg-ink-raised p-6 text-bone"
            >
              {n}
            </StaggerItem>
          ))}
        </Stagger>
      </Row>
    </main>
  );
}
